package com.yuaud.backend_api.dto.error;

public record ApiError(
        int status,
        String message
) {
}
