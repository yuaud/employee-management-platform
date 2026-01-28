package com.yuaud.backend_api.dto.employee;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.department.DepartmentUltraLightResponse;
import com.yuaud.backend_api.dto.job.JobResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record EmployeeResponseLight(
        Long employeeId,
        String fileUrl,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        BigDecimal salary,
        LocalDate hireDate,
        Long managerId,
        Boolean isManager,
        JobResponse job,
        DepartmentUltraLightResponse department,
        List<EmployeeResponseLight> subordinates
) {
}
