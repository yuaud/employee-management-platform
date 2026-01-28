package com.yuaud.backend_api.dto.job;

import jakarta.validation.constraints.Size;

public record JobUpdateRequest(
        @Size(max = 150) String jobTitle
) {
}
