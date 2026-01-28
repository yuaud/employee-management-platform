package com.yuaud.backend_api.dto.location;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LocationCreateRequest(
        @Size(max = 255) String streetAddress,
        @Size(max = 20) String postalCode,
        @NotEmpty @NotBlank @Size(max = 100) String city,
        @NotEmpty @NotBlank String countryId
) {
}
