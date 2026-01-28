package com.yuaud.backend_api.dto.job;

import com.yuaud.backend_api.dto.employee.EmployeeResponseUltraLight;

import java.time.Instant;
import java.util.List;

public record JobDetailResponse(
        String jobId,
        String jobTitle,
        Instant createdAt,
        Instant updatedAt,
        int employeeCount,
        List<EmployeeResponseUltraLight> employees
) {
}
