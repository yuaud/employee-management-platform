package com.yuaud.backend_api.dto.location;

import com.yuaud.backend_api.dto.country.CountryLightResponse;

public record LocationLightResponse(
        Long locationId,
        CountryLightResponse country,
        String city
) {
}
