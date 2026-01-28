package com.yuaud.backend_api.dto.employee;

import java.time.LocalDate;

public record EmployeeResponseUltraLight(
        Long employeeId,
        String fileUrl,
        String firstName,
        String lastName,
        String email,
        LocalDate hireDate,
        Boolean isManager
) {
}
