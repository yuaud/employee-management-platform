package com.yuaud.backend_api.service;

import com.yuaud.backend_api.dto.department.*;
import com.yuaud.backend_api.dto.employee.EmployeeResponse;
import com.yuaud.backend_api.dto.employee.SortDirection;
import com.yuaud.backend_api.dto.employee.mapper.EmployeeMapper;
import com.yuaud.backend_api.entity.Department;
import com.yuaud.backend_api.entity.Location;
import com.yuaud.backend_api.repository.DepartmentRepository;
import com.yuaud.backend_api.repository.EmployeeRepository;
import com.yuaud.backend_api.repository.LocationRepository;
import com.yuaud.backend_api.service.interfaces.DepartmentService;
import com.yuaud.backend_api.specification.DepartmentSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.yuaud.backend_api.dto.department.mapper.DepartmentMapper;
import org.springframework.util.StringUtils;

import static com.yuaud.backend_api.dto.department.mapper.DepartmentMapper.toLightResponse;
import static com.yuaud.backend_api.dto.department.mapper.DepartmentMapper.toResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final LocationRepository locationRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<DepartmentLightResponse> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        if(departments.isEmpty()){
            return departments
                    .stream()
                    .map(DepartmentMapper::toLightResponse)
                    .toList();
        }
        return departments
                .stream()
                .map(DepartmentMapper::toLightResponse)
                .toList();
    }

    @Override
    public Page<DepartmentLightResponse> filterDepartments(DepartmentFilterRequest request, Pageable pageable){
        Specification<Department> spec = DepartmentSpecification.filter(request);
        Sort sort = Sort.unsorted();
        if(request.sort() != null){
            Sort.Order order = new Sort.Order(
                    request.sort().direction() == SortDirection.ASC ? Sort.Direction.ASC : Sort.Direction.DESC,
                    request.sort().field().field()
            );
            sort = Sort.by(order);
        }
        Pageable pageableWithSort = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );

        Page<DepartmentLightResponse> response = departmentRepository.findAll(spec, pageableWithSort)
                .map(DepartmentMapper::toLightResponse);
        return response;
    }


    @Override
    public DepartmentResponse getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found by id: "+ departmentId));
        return toResponse(department);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public DepartmentLightResponse createDepartment(DepartmentCreateRequest request) {
        if(departmentRepository.existsByDepartmentName(request.departmentName())){
            throw  new IllegalStateException("Department with this name already exists: "+ request.departmentName());
        }

        Department department = new Department();
        department.setDepartmentName(request.departmentName());

        if(request.locationId() != null){
            Location location = locationRepository.findById(request.locationId())
                    .orElseThrow(() -> new IllegalStateException("This location id does not exists: "+request.locationId()));
            department.setLocation(location);
        }
        department.setEmployees(new ArrayList<>());
        Department saved = departmentRepository.save(department);

        return toLightResponse(saved);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public DepartmentLightResponse updateDepartment(Long departmentId, DepartmentUpdateRequest request) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department does not exists with id: "+departmentId));
        if(StringUtils.hasText(request.departmentName())){
            department.setDepartmentName(request.departmentName().trim());
        }
        if(request.locationId() != null){
            Location location = locationRepository.findById(request.locationId())
                    .orElseThrow(() -> new EntityNotFoundException("Location does not exists with id: "+ request.locationId()));
            department.setLocation(location);
        }
        Department updated = departmentRepository.save(department);
        return toLightResponse(updated);
    }

    @Override
    public List<EmployeeResponse> getAllEmployeesByDepartment(Long departmentId){
        if(!departmentRepository.existsById(departmentId)){
            throw new EntityNotFoundException("Department not found with id: "+departmentId);
        }
        return employeeRepository.findByDepartment_DepartmentId(departmentId)
                .stream()
                .map(EmployeeMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public void deleteDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(()-> {
                    throw new EntityNotFoundException("Department does not exists with id: "+departmentId);
                });
        if(department.getEmployees().size() > 0){
            throw new IllegalStateException("Department cannot be deleted, Employee count on this department is: "
                    + department.getEmployees().size());
        }

        departmentRepository.deleteById(departmentId);
    }
}
