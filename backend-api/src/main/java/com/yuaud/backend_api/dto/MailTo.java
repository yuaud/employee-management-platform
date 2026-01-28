package com.yuaud.backend_api.dto;

import jakarta.validation.constraints.Size;

public record MailTo(
        @Size(max = 255) String subject,
        @Size(max = 1000) String message
) {
}
