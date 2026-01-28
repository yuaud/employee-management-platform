package com.yuaud.backend_api.dto.country;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.yuaud.backend_api.dto.region.RegionResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CountryResponse(
        String countryId,
        String countryName,
        RegionResponse region
) {
}
