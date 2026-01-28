package com.yuaud.backend_api.dto.department.mapper;

import com.yuaud.backend_api.dto.department.DepartmentLightResponse;
import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.dto.department.DepartmentUltraLightResponse;
import com.yuaud.backend_api.dto.employee.EmployeeResponseUltraLight;
import com.yuaud.backend_api.dto.location.mapper.LocationMapper;
import com.yuaud.backend_api.entity.Department;

import java.util.List;

public class DepartmentMapper {
    public static DepartmentResponse toResponse(Department department){
        if(department == null) return null;

        //Employee listesi DTO'ya çevriliyor
        List<EmployeeResponseUltraLight> employeeDTOs = department.getEmployees() == null ?
                List.of() :
                department.getEmployees().stream()
                        .map(emp -> new EmployeeResponseUltraLight(
                                emp.getEmployeeId(),
                                emp.getFileUrl(),
                                emp.getFirstName(),
                                emp.getLastName(),
                                emp.getEmail(),
                                emp.getHireDate(),
                                emp.getIsManager()
                        ))
                        .toList();

        return new DepartmentResponse(
                department.getDepartmentId(),
                department.getDepartmentName(),
                LocationMapper.toResponse(department.getLocation()),
                employeeDTOs,
                department.getEmployees() != null ? department.getEmployees().size() : 0,
                department.getCreatedAt(),
                department.getUpdatedAt()
        );
    }

    public static DepartmentLightResponse toLightResponse(Department department){
        if(department == null) return null;
        return new DepartmentLightResponse(
                department.getDepartmentId(),
                department.getDepartmentName(),
                LocationMapper.toLightResponse(department.getLocation()),
                department.getEmployees() != null ? department.getEmployees().size() : 0
        );
    }

    public static DepartmentUltraLightResponse toUltraLightResponse(Department department){
        if(department == null) return null;
        return new DepartmentUltraLightResponse(
                department.getDepartmentId(),
                department.getDepartmentName()
        );
    }

}
