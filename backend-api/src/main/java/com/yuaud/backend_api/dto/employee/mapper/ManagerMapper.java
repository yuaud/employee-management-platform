package com.yuaud.backend_api.dto.employee.mapper;

import com.yuaud.backend_api.dto.department.mapper.DepartmentMapper;
import com.yuaud.backend_api.dto.employee.ManagerLightResponse;
import com.yuaud.backend_api.dto.employee.ManagerResponse;
import com.yuaud.backend_api.dto.employee.SubordinatesResponse;
import com.yuaud.backend_api.dto.job.mapper.JobMapper;
import com.yuaud.backend_api.entity.Employee;

import java.util.List;

public class ManagerMapper {
    public static ManagerResponse toResponse(Employee manager){
        if(manager == null) return null;

        return new ManagerResponse(
                manager.getEmployeeId(),
                manager.getFileUrl(),
                manager.getFirstName(),
                manager.getLastName(),
                manager.getEmail(),
                manager.getPhoneNumber(),
                manager.getSalary(),
                manager.getHireDate(),
                JobMapper.toResponse(manager.getJob()),
                manager.getDepartment().getDepartmentId(),
                SubordinatesMapper.toResponse(manager.getSubordinates())
        );
    }
    public static ManagerLightResponse toLightResponse(Employee manager){
        if(manager == null) return null;
        return new ManagerLightResponse(
                manager.getEmployeeId(),
                manager.getFileUrl(),
                manager.getFirstName(),
                manager.getLastName(),
                manager.getEmail(),
                manager.getPhoneNumber(),
                manager.getHireDate(),
                JobMapper.toResponse(manager.getJob()),
                DepartmentMapper.toUltraLightResponse(manager.getDepartment())
        );
    }
}
