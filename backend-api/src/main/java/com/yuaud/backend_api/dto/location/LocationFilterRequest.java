package com.yuaud.backend_api.dto.location;

import com.yuaud.backend_api.dto.employee.SortRequest;

public record LocationFilterRequest(
        String country,
        String city,
        String postalCode,
        Long departmentId,
        SortRequest sort
) {
}
