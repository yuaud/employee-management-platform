package com.yuaud.backend_api.dto.job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

//20
//150

public record JobCreateRequest(
        @NotBlank @Size(max = 20) String jobId,
        @NotBlank @Size(max = 150) String jobTitle
) {
}
