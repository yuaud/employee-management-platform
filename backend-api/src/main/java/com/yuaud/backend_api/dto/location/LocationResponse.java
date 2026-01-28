package com.yuaud.backend_api.dto.location;

import com.yuaud.backend_api.dto.country.CountryResponse;
import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.entity.Country;

import java.time.Instant;
import java.util.List;

public record LocationResponse(
        Long locationId,
        String streetAddress,
        String postalCode,
        String city,
        CountryResponse country,
        List<LocationLightDepartmentResponse> departments,
        Instant createdAt,
        Instant updatedAt
) {
}
