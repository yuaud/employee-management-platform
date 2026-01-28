package com.yuaud.backend_api.dto.employee.mapper;

import com.yuaud.backend_api.dto.department.mapper.DepartmentMapper;
import com.yuaud.backend_api.dto.employee.EmployeeResponse;
import com.yuaud.backend_api.dto.employee.EmployeeResponseLight;
import com.yuaud.backend_api.dto.job.mapper.JobMapper;
import com.yuaud.backend_api.entity.Employee;

import java.util.List;


public class EmployeeMapper {
    public static EmployeeResponse toResponse(Employee employee){
        if(employee == null) return null;

        List<EmployeeResponseLight> subordinates = null;
        if(Boolean.TRUE.equals(employee.getIsManager())
                && employee.getSubordinates() != null){
            subordinates = employee.getSubordinates()
                    .stream()
                    .map(EmployeeMapper::toLightResponse)
                    .toList();
        }

        return new EmployeeResponse(
                employee.getEmployeeId(),
                employee.getFileUrl(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhoneNumber(),
                employee.getSalary(),
                employee.getHireDate(),
                ManagerMapper.toLightResponse(employee.getManager()),
                employee.getIsManager(),
                JobMapper.toResponse(employee.getJob()),
                DepartmentMapper.toResponse(employee.getDepartment()),
                subordinates,
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }
    public static EmployeeResponseLight toLightResponse(Employee employee){
        if(employee == null) return null;

        List<EmployeeResponseLight> subordinates = null;
        if(Boolean.TRUE.equals(employee.getIsManager())
                && employee.getSubordinates() != null){
            subordinates = employee.getSubordinates()
                    .stream()
                    .map(sub -> new EmployeeResponseLight(
                            sub.getEmployeeId(),
                            sub.getFileUrl(),
                            sub.getFirstName(),
                            sub.getLastName(),
                            sub.getEmail(),
                            sub.getPhoneNumber(),
                            sub.getSalary(),
                            sub.getHireDate(),
                            employee.getEmployeeId(), //managerId
                            sub.getIsManager(),
                            JobMapper.toResponse(sub.getJob()),
                            DepartmentMapper.toUltraLightResponse(sub.getDepartment()),
                            null    //subordinates of subordinate null, sonsuz donguyu kirmak icin
                    ))
                    .toList();
        }

        return new EmployeeResponseLight(
                employee.getEmployeeId(),
                employee.getFileUrl(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhoneNumber(),
                employee.getSalary(),
                employee.getHireDate(),
                employee.getManager() != null ? employee.getManager().getEmployeeId() : null,
                employee.getIsManager(),
                JobMapper.toResponse(employee.getJob()),
                DepartmentMapper.toUltraLightResponse(employee.getDepartment()),
                subordinates
        );
    }
}
