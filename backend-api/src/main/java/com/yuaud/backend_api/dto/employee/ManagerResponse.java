package com.yuaud.backend_api.dto.employee;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.job.JobResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ManagerResponse(
        Long employeeId,
        String fileUrl,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        BigDecimal salary,
        LocalDate hireDate,
        JobResponse job,
        Long departmentId,
        List<SubordinatesResponse> subordinates
) {
}
