package com.yuaud.backend_api.dto.department;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.employee.EmployeeResponseUltraLight;
import com.yuaud.backend_api.dto.location.LocationResponse;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record DepartmentResponse(
        Long departmentId,
        String departmentName,
        LocationResponse location,
        List<EmployeeResponseUltraLight> employees,
        int employeeCount,   //opsiyonel
        Instant createdAt,
        Instant updatedAt
) {
}
