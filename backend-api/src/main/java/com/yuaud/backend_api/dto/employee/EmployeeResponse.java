package com.yuaud.backend_api.dto.employee;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.dto.job.JobResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record EmployeeResponse(
        Long employeeId,
        String fileUrl,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        BigDecimal salary,
        LocalDate hireDate,
        ManagerLightResponse manager,
        Boolean isManager,
        JobResponse job,
        DepartmentResponse department,
        List<EmployeeResponseLight> subordinates,
        Instant createdAt,
        Instant updatedAt
) {
}
