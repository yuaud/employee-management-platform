package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.department.*;
import com.yuaud.backend_api.dto.employee.EmployeeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface DepartmentService {
    List<DepartmentLightResponse> getAllDepartments();

    Page<DepartmentLightResponse> filterDepartments(DepartmentFilterRequest request, Pageable pageable);

    DepartmentResponse getDepartmentById(Long departmentId);

    DepartmentLightResponse createDepartment(DepartmentCreateRequest request);

    DepartmentLightResponse updateDepartment(Long departmentId, DepartmentUpdateRequest request);

    List<EmployeeResponse> getAllEmployeesByDepartment(Long departmentId);

    void deleteDepartmentById(Long departmentId);
}
