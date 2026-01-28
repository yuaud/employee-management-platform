package com.yuaud.backend_api.dto.employee;

public enum EmployeeSortField {
    HIRE_DATE("hireDate"),
    SALARY("salary"),
    UPDATED_AT("updatedAt"),
    COUNT("count");

    private final String field;

    EmployeeSortField(String field){
        this.field = field;
    }
    public String field(){
        return field;
    }
}
