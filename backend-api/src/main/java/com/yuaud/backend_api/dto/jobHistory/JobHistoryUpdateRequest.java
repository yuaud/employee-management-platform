package com.yuaud.backend_api.dto.jobHistory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record JobHistoryUpdateRequest(
        LocalDate startDate,
        LocalDate endDate,
        @Size(max = 200) String jobId
) {
}
