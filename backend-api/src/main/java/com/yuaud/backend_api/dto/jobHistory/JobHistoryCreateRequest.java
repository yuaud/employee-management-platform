package com.yuaud.backend_api.dto.jobHistory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record JobHistoryCreateRequest(
        @Size(max = 255) String companyName,
        @NotNull LocalDate startDate,
        LocalDate endDate,
        @NotBlank @Size(max = 200) String jobId
) {
}
