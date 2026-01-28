package com.yuaud.backend_api.dto.jobHistory;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.job.JobResponse;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record JobHistoryResponse(
        Long jobHistoryId,
        Long employeeId,
        String companyName,
        LocalDate startDate,
        LocalDate endDate,
        String job
) {
}
