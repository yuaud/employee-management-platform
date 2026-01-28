package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.job.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    List<JobResponse> getAllJobs();
    Page<JobResponse> filterJobs(JobFilterRequest request, Pageable pageable);
    JobDetailResponse getJobById(String jobId);
    List<JobResponse> getJobsByTitle(String jobTitle);

    JobResponse createJob(JobCreateRequest request);

    JobResponse updateJob(String jobId, JobUpdateRequest request);

    void deleteJobById(String jobId);
}
