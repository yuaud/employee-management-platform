package com.yuaud.backend_api.controller;

import com.yuaud.backend_api.dto.job.*;
import com.yuaud.backend_api.service.JobServiceImpl;
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
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobServiceImpl jobService;

    @Operation(summary = "Get all jobs")
    @GetMapping()
    public ResponseEntity<List<JobResponse>> getAllJobs(
            @RequestParam(required = false) String title
    ){
        if(title == null || title.isBlank()){
            return ResponseEntity.ok(jobService.getAllJobs());
        }
        return ResponseEntity.ok(jobService.getJobsByTitle(title));
    }

    @Operation(summary = "Filter Jobs")
    @PostMapping("/filter")
    public ResponseEntity<Page<JobResponse>> filterJobs(
            @RequestBody JobFilterRequest request,
            Pageable pageable
            ) {
        return ResponseEntity.ok(jobService.filterJobs(request, pageable));
    }

    @Operation(summary = "Get a job by given job id")
    @GetMapping("/{jobId}")
    public ResponseEntity<JobDetailResponse> getJobById(
            @PathVariable String jobId
    ){
        return ResponseEntity.ok(jobService.getJobById(jobId));
    }

    @Operation(summary = "Create a new job")
    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody JobCreateRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(jobService.createJob(request));
    }

    @Operation(summary = "Update a job by given job id")
    @PutMapping("/{jobId}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable String jobId,
            @Valid @RequestBody JobUpdateRequest request
            ){
        return ResponseEntity.ok(jobService.updateJob(jobId, request));
    }

    @Operation(summary = "Delete a job by given job id")
    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable String jobId
    ){
        jobService.deleteJobById(jobId);
        return ResponseEntity.noContent().build();
    }

}
