package com.yuaud.backend_api.dto.employee.mapper;

import com.yuaud.backend_api.dto.employee.SubordinatesResponse;
import com.yuaud.backend_api.entity.Employee;

import java.util.List;

public class SubordinatesMapper {
    public static List<SubordinatesResponse> toResponse(List<Employee> subordinates){
        if(subordinates == null || subordinates.isEmpty()) return List.of();
        return subordinates.stream()
                .map(sub -> new SubordinatesResponse(
                        sub.getEmployeeId(),
                        sub.getFirstName(),
                        sub.getLastName()
                ))
                .toList();
    }
}
