package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.employee.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface EmployeeService {
    List<EmployeeResponseLight> getAllEmployees();
    Page<EmployeeResponseLight> filterEmployees(EmployeeFilterRequest filter, Pageable pageable);
    List<ManagerLightResponse> getAllManagers();
    ManagerResponse getManagerById(Long managerId);
    EmployeeResponse getEmployeeById(Long employeeId);

    EmployeeResponseLight createEmployee(EmployeeCreateRequest request, List<MultipartFile> files);

    EmployeeResponseLight updateEmployee(Long employeeId, EmployeeUpdateRequest request, List<MultipartFile> files);

    void deleteEmployeeById(Long employeeId);


}
