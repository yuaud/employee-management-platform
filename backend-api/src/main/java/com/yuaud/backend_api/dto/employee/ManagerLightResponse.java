package com.yuaud.backend_api.dto.employee;

import com.yuaud.backend_api.dto.department.DepartmentUltraLightResponse;
import com.yuaud.backend_api.dto.job.JobResponse;

import java.time.LocalDate;


public record ManagerLightResponse(
        Long employeeId,
        String fileUrl,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        LocalDate hireDate,
        JobResponse job,
        DepartmentUltraLightResponse department
) {
}
