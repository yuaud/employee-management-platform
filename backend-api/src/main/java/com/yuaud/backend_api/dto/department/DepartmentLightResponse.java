package com.yuaud.backend_api.dto.department;

import com.yuaud.backend_api.dto.location.LocationLightResponse;

public record DepartmentLightResponse(
        Long departmentId,
        String departmentName,
        LocationLightResponse location,
        int employeeCount
) {
}


