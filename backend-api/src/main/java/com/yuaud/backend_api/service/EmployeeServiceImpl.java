package com.yuaud.backend_api.service;


import com.yuaud.backend_api.dto.employee.*;
import com.yuaud.backend_api.dto.employee.mapper.EmployeeMapper;
import com.yuaud.backend_api.dto.employee.mapper.ManagerMapper;
import com.yuaud.backend_api.entity.Department;
import com.yuaud.backend_api.entity.Employee;
import com.yuaud.backend_api.entity.Job;
import com.yuaud.backend_api.repository.DepartmentRepository;
import com.yuaud.backend_api.repository.EmployeeRepository;
import com.yuaud.backend_api.repository.JobRepository;
import com.yuaud.backend_api.service.interfaces.EmployeeService;
import com.yuaud.backend_api.specification.EmployeeSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;


import static com.yuaud.backend_api.dto.employee.mapper.EmployeeMapper.toResponse;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final JobRepository jobRepository;
    private final DepartmentRepository departmentRepository;
    private final S3Service s3Service;

    @Value("${aws.s3.default-file}")
    private String DEFAULT_FILE_URL;

    final long MAX_SIZE = 5 * 1024 * 1024;

    @Override
    public List<EmployeeResponseLight> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        if(employees.isEmpty()){
            //Boş list ama hata degil.
        }
        return employees
                .stream()
                .map(EmployeeMapper::toLightResponse)
                .toList();
    }

    public Page<EmployeeResponseLight> filterEmployees(EmployeeFilterRequest request, Pageable pageable) {
        Specification<Employee> spec = EmployeeSpecification.filter(request);
        Sort sort = Sort.unsorted();
        if(request.sorts() != null && !request.sorts().isEmpty()){
            List<Sort.Order> orders = request.sorts()
                    .stream()
                    .map(s -> new Sort.Order(
                            s.direction() == SortDirection.ASC
                                    ? Sort.Direction.ASC
                                    : Sort.Direction.DESC,
                            s.field().field()
                    ))
                    .toList();
            sort = Sort.by(orders);
        }
        Pageable pageableWithSort = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );
        Page<EmployeeResponseLight> page = employeeRepository.findAll(spec, pageableWithSort)
                .map(EmployeeMapper::toLightResponse);
        return page;
    }

    @Override
    public List<ManagerLightResponse> getAllManagers(){
        List<Employee> managers = employeeRepository.findByIsManager(true);
        if(managers.isEmpty()){}
        return managers
                .stream()
                .map(ManagerMapper::toLightResponse)
                .toList();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: "+ employeeId));
        return toResponse(employee);
    }

    @Override
    public ManagerResponse getManagerById(Long managerId){
        Employee manager = employeeRepository.findManagerById(managerId)
                .orElseThrow(() -> new EntityNotFoundException("Manager not found with id: "+ managerId));
        return ManagerMapper.toResponse(manager);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    @Transactional
    public EmployeeResponseLight createEmployee(EmployeeCreateRequest request, List<MultipartFile> files) {

        if(employeeRepository.existsByEmail(request.email())){
            throw new IllegalStateException("Employee with this email already exists: "+ request.email());
        }

        Employee employee = new Employee();
        employee.setFileUrl(resolveFileUrlForCreate(files));
        if(StringUtils.hasText(request.firstName())){
            employee.setFirstName(request.firstName().trim());
        }
        employee.setLastName(request.lastName().trim());
        employee.setEmail(request.email().trim());
        if(StringUtils.hasText(request.phoneNumber())){
            employee.setPhoneNumber(request.phoneNumber().trim());
        }
        if(request.salary() != null){
            employee.setSalary(request.salary());
        }
        employee.setHireDate(request.hireDate());
        Job job = jobRepository.findById(request.jobId())
                .orElseThrow(() -> new EntityNotFoundException("Job not found with id: "+ request.jobId()));
        employee.setJob(job);
        Department department = departmentRepository.findById(request.departmentId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: "+ request.departmentId()));
        employee.setDepartment(department);
        if(request.managerId() == null){
            employee.setManager(null);
        }else{
            Employee manager = employeeRepository.findById(request.managerId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Manager not found with id: "+ request.managerId()
                    ));
            employee.setManager(manager);
        }
        //default false, null gelirse de false
        employee.setIsManager(Boolean.TRUE.equals(request.isManager()));

        Employee saved = employeeRepository.save(employee);

        // employeeId, subordinates'lere atanacagi icin save()'den sonra subordinates atamasi yapilmali. @Transactional zorunlu
        if(Boolean.TRUE.equals(request.isManager())
                && request.subordinateIds() != null
                && !request.subordinateIds().isEmpty()){
            updateSubordinates(saved, request.subordinateIds());
        }

        return EmployeeMapper.toLightResponse(saved);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    @Transactional
    public EmployeeResponseLight updateEmployee(Long employeeId, EmployeeUpdateRequest request, List<MultipartFile> files) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: "+ employeeId));
        employee.setFileUrl(resolveFileUrlForUpdate(files, employee.getFileUrl()));
        if(StringUtils.hasText(request.firstName())) employee.setFirstName(request.firstName().trim());
        if(StringUtils.hasText(request.lastName())) employee.setLastName(request.lastName().trim());
        if(StringUtils.hasText(request.email())) employee.setEmail(request.email().trim());
        if(StringUtils.hasText(request.phoneNumber())) employee.setPhoneNumber(request.phoneNumber().trim());
        if(request.salary() != null) employee.setSalary(request.salary());
        if(request.hireDate() != null) employee.setHireDate(request.hireDate());
        if(request.jobId() != null) {
            Job job = jobRepository.findById(request.jobId())
                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: "+ request.jobId()));
            employee.setJob(job);
        }
        if(request.departmentId() != null) {
            Department department = departmentRepository.findById(request.departmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found with id: "+ request.departmentId()));
            employee.setDepartment(department);
        }
        if(Boolean.TRUE.equals(request.removeManagerId())){
            employee.setManager(null);
        } else if(request.managerId() != null){
            Employee manager = employeeRepository.findManagerById(request.managerId())
                    .orElseThrow(() ->
                            new EntityNotFoundException("Manager not found with id: "+request.managerId())
                    );
            employee.setManager(manager);
        }
        if(request.isManager() != null){
            employee.setIsManager(request.isManager());
            // Manager = True, Subordinates != null -> subordinates atamasi
            if(Boolean.TRUE.equals(request.isManager())){
                if(request.subordinateIds() != null){
                    updateSubordinates(employee, request.subordinateIds());
                }
            }
            // Manager = False, subordinates != null -> subordinatesi temizle. artik manager degil
            else{
                clearSubordinates(employee);
            }
        }
        Employee updated = employeeRepository.save(employee);
        return EmployeeMapper.toLightResponse(updated);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    @Transactional
    public void deleteEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: "+ employeeId));
        if(Boolean.TRUE.equals(employee.getIsManager())){
            clearSubordinates(employee);
        }
        s3Service.delete(employee.getFileUrl());
        employeeRepository.deleteById(employeeId);
    }

    private String resolveFileUrlForCreate(List<MultipartFile> files){
        String fileUrl = DEFAULT_FILE_URL;

        //hic dosya gonderilmemisse default
        if(files == null || files.isEmpty())
            return fileUrl;

        //birden fazla dosya kontrolü
        if(files.size() != 1)
            throw new IllegalArgumentException("Only one file must be uploaded");
        MultipartFile file = files.get(0);

        // Dosya bossa default
        if(file == null || file.isEmpty())
            return fileUrl;

        //Boyut kontrolu
        if(file.getSize() > MAX_SIZE)
            throw new IllegalArgumentException("File size must be <= 5MB");

        return s3Service.uploadImage(file);
    }

    private String resolveFileUrlForUpdate(List<MultipartFile> files, String currentFileUrl){
        /*Dosya yüklenmediyse s3'e istek atma, mevcut fileUrl'yi döndür*/
        if(files == null || files.isEmpty() || files.get(0).isEmpty()){
            return currentFileUrl;
        }
        if(files.size() != 1)
            throw new IllegalArgumentException("Only one file must be uploaded");

        MultipartFile file = files.get(0);
        if(file.getSize() > MAX_SIZE)
            throw new IllegalArgumentException("File size must be <= 5MB");

        return s3Service.uploadImage(file);
    }

    private void updateSubordinates(Employee manager, List<Long> ids){
        //kendi kendini subordinates yapamamasi
        if(manager.getEmployeeId() != null && ids.contains(manager.getEmployeeId())){
            throw new IllegalArgumentException("Employee cannot be subordinate of itself");
        }
        //subordinates'lerin onceki manager'ini kaldir
        clearSubordinates(manager);

        //subordinates'lere yeni manager'i ata
        List<Employee> subordinates = employeeRepository.findAllById(ids);
        //Bulunan subordinates'ler ile gelen subordinates'lerin boyut eslesme kontrolu
        if(subordinates.size() != ids.size()){
            throw new IllegalArgumentException("One or more subordinate ids are invalid");
        }
        System.out.println("updateSubordinates, subordinates mapleme...");
        subordinates.forEach(e -> e.setManager(manager));
    }
    private void clearSubordinates(Employee manager){
        if(manager.getSubordinates() != null){
            manager.getSubordinates()
                    .forEach(e -> e.setManager(null));
        }
    }
}
