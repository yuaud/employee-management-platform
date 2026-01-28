package com.yuaud.backend_api.controller;

import com.yuaud.backend_api.dto.department.*;
import com.yuaud.backend_api.dto.employee.EmployeeResponse;
import com.yuaud.backend_api.service.DepartmentServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentServiceImpl departmentService;

    @Operation(summary = "Get all departments")
    @GetMapping
    public ResponseEntity<List<DepartmentLightResponse>> getAllDepartments(){
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @Operation(summary = "Filter departments")
    @PostMapping("/filter")
    public ResponseEntity<Page<DepartmentLightResponse>> filterDepartments(
            @RequestBody DepartmentFilterRequest request,
            Pageable pageable
            ){
        return ResponseEntity.ok(departmentService.filterDepartments(request, pageable));
    }

    @Operation(summary = "Get department by department id")
    @GetMapping("/{departmentId}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(
            @PathVariable Long departmentId
    ){
        return ResponseEntity.ok(departmentService.getDepartmentById(departmentId));
    }

    @Operation(
            summary = "Get all employees by department",
            description = "Get all employees by given department id"
    )
    @GetMapping("/{departmentId}/employees")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployeesByDepartment(
            @PathVariable Long departmentId
    ) {
        return ResponseEntity.ok(departmentService.getAllEmployeesByDepartment(departmentId));
    }

    @Operation(summary = "Create a new department")
    @PostMapping
    public ResponseEntity<DepartmentLightResponse> createDepartment(
            @Valid @RequestBody DepartmentCreateRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(departmentService.createDepartment(request));
    }

    @Operation(summary = "Update a department by given department id")
    @PutMapping("/{departmentId}")
    public ResponseEntity<DepartmentLightResponse> updateDepartment(
            @PathVariable Long departmentId,
            @Valid @RequestBody DepartmentUpdateRequest request
            ) {
        return ResponseEntity.ok(departmentService.updateDepartment(departmentId, request));
    }

    @Operation(summary = "Delete a department by given department id")
    @DeleteMapping("/{departmentId}")
    public ResponseEntity<Void> deleteDepartment(
            @PathVariable Long departmentId
    ) {
        departmentService.deleteDepartmentById(departmentId);
        return ResponseEntity.noContent().build();
    }
}
