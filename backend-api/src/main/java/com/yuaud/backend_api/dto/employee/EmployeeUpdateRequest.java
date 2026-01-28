package com.yuaud.backend_api.dto.employee;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record EmployeeUpdateRequest(
        @Size(max = 100) String firstName,
        @Size(max = 100) String lastName,
        @Size(max = 255) @Email String email,
        @Size(max = 20) String phoneNumber,
        @PositiveOrZero BigDecimal salary,
        LocalDate hireDate,
        @Size(max = 20) String jobId,
        Long departmentId,
        Long managerId, //opsiyonel
        Boolean removeManagerId,
        Boolean isManager,
        List<Long> subordinateIds
) {
}
