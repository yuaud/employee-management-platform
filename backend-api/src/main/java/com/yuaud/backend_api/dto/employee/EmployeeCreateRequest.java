package com.yuaud.backend_api.dto.employee;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record EmployeeCreateRequest(
        @Size(max = 100) String firstName,
        @NotBlank @Size(max = 100) String lastName,
        @NotBlank @Size(max = 255) @Email String email,
        @Size(max = 20) String phoneNumber,
        @PositiveOrZero BigDecimal salary,
        @NotNull LocalDate hireDate,
        @NotBlank @Size(max = 20) String jobId,
        @NotNull Long departmentId,
        Long managerId, //opsiyonel
        Boolean isManager,
        List<Long> subordinateIds
) {
}
