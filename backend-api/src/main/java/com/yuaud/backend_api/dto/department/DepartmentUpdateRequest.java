package com.yuaud.backend_api.dto.department;

import jakarta.validation.constraints.Size;

public record DepartmentUpdateRequest(
        @Size(max = 255) String departmentName,
        Long locationId
) {
}
