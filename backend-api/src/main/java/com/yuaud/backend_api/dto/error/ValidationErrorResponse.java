package com.yuaud.backend_api.dto.error;

public record ValidationErrorResponse(
        String field,
        String message
) {
}
