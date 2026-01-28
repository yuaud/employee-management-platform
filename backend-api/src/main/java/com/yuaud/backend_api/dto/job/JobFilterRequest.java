package com.yuaud.backend_api.dto.job;

import com.yuaud.backend_api.dto.employee.SortRequest;



public record JobFilterRequest(
        String search,
        SortRequest sort // updatedAt
) {
}
