package com.yuaud.backend_api.controller;

import com.yuaud.backend_api.dto.employee.*;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryCreateRequest;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryResponse;
import com.yuaud.backend_api.service.EmployeeServiceImpl;
import com.yuaud.backend_api.service.JobHistoryServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeServiceImpl employeeService;
    private final JobHistoryServiceImpl jobHistoryService;

    @Operation(summary = "Get all employees")
    @GetMapping
    public ResponseEntity<List<EmployeeResponseLight>> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @Operation(summary = "Filter employees")
    @PostMapping("/filter")
    public ResponseEntity<Page<EmployeeResponseLight>> filter(
            @RequestBody EmployeeFilterRequest request,
            Pageable pageable
    ) {
        return ResponseEntity.ok(employeeService.filterEmployees(request, pageable));
    }

    @Operation(
            summary = "Get all Managers",
            description = "Getting all managers. A manager is an employee who has subordinates under them."
    )
    @GetMapping("/managers")
    public ResponseEntity<List<ManagerLightResponse>> getAllManagers(){
        return ResponseEntity.ok(employeeService.getAllManagers());
    }

    @Operation(summary = "Get Manager by id")
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<ManagerResponse> getManagerById(
            @PathVariable Long managerId
    ){
        return ResponseEntity.ok(employeeService.getManagerById(managerId));
    }

    @Operation(summary = "Get employee by id")
    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @PathVariable Long employeeId
    ) {
        return ResponseEntity.ok(employeeService.getEmployeeById(employeeId));
    }

    @Operation(summary = "Create an employee")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmployeeResponseLight> createEmployee(
            @Valid @RequestPart("request") EmployeeCreateRequest request,
            @RequestPart(value = "file", required = false) List<MultipartFile> files
            ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employeeService.createEmployee(request, files));
    }

    @Operation(summary = "Update an employee by id")
    @PutMapping(value = "/{employeeId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmployeeResponseLight> updateEmployee(
            @PathVariable Long employeeId,
            @Valid @RequestPart("request") EmployeeUpdateRequest request,
            @RequestPart(value = "file", required = false) List<MultipartFile> files
            ){
        return ResponseEntity.ok(employeeService.updateEmployee(employeeId, request, files));
    }

    @Operation(summary = "Delete an employee by id")
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long employeeId
    ) {
        employeeService.deleteEmployeeById(employeeId);
        return ResponseEntity.noContent().build();
    }


    // Job History Methods

    @Operation(
            summary = "Get job history of employee",
            description = "Get job history of employee by given employee id"
    )
    @GetMapping("/{employeeId}/job-history")
    public ResponseEntity<List<JobHistoryResponse>> getJobHistoryOfEmployee(
            @PathVariable Long employeeId
    ){
        return ResponseEntity.ok(jobHistoryService.getJobHistoryByEmployee(employeeId));
    }

    @Operation(
            summary = "Create a job history entry for given employee",
            description = "Create a new job history entry for given employee"
    )
    @PostMapping("/{employeeId}/job-history")
    public ResponseEntity<JobHistoryResponse> createJobHistory(
            @PathVariable Long employeeId,
            @Valid @RequestBody JobHistoryCreateRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(jobHistoryService.createJobHistory(employeeId, request));
    }

    @Operation(
            summary = "Delete a job history entry for given employee",
            description = "Delete a job history entry by given job history id for given employee id"
    )
    @DeleteMapping("/{employeeId}/job-history/{jobHistoryId}")
    public ResponseEntity<Void> deleteJobHistoryById(
            @PathVariable Long employeeId,
            @PathVariable Long jobHistoryId
    ){
        jobHistoryService.deleteJobHistory(employeeId, jobHistoryId);
        return ResponseEntity.noContent().build();
    }


}
