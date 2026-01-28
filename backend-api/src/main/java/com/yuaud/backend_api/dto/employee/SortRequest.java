package com.yuaud.backend_api.dto.employee;

public record SortRequest(
        EmployeeSortField field,
        SortDirection direction
) {
}
