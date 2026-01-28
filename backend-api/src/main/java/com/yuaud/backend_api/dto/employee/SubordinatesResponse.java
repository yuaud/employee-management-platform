package com.yuaud.backend_api.dto.employee;


import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SubordinatesResponse(
        Long employeeId,
        String firstName,
        String lastName
) {
}
