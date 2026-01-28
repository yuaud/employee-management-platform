package com.yuaud.backend_api.dto.employee;

import java.util.List;

public record EmployeeFilterRequest(
        Long departmentId,
        String jobTitle,
        Long managerId,
        Boolean isManager,
        String search, // firstname + lastname + email
        List<SortRequest> sorts //hireDate, salary, updatedAt
) {
}
