package com.yuaud.backend_api.dto.department;

import com.yuaud.backend_api.dto.employee.SortRequest;

public record DepartmentFilterRequest(
        String departmentName,
        Long locationId,
        SortRequest sort
) {
}
