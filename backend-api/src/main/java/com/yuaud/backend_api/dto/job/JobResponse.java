package com.yuaud.backend_api.dto.job;


import java.time.Instant;

public record JobResponse(
        String jobId,
        String jobTitle,
        Instant createdAt,
        Instant updatedAt,
        Long employeeCount
) {
}
