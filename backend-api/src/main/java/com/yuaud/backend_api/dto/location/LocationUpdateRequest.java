package com.yuaud.backend_api.dto.location;

import com.yuaud.backend_api.entity.Country;

public record LocationUpdateRequest(
        String streetAddress,
        String postalCode,
        String city,
        String countryId
) {
}
