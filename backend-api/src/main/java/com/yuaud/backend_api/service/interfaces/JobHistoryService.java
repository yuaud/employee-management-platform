package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.jobHistory.JobHistoryCreateRequest;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryResponse;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryUpdateRequest;

import java.util.List;

public interface JobHistoryService {
    List<JobHistoryResponse> getJobHistoryByEmployee(Long employeeId);

    JobHistoryResponse createJobHistory(Long employeeId, JobHistoryCreateRequest request);

    JobHistoryResponse updateJobHistory(Long jobHistoryId, JobHistoryUpdateRequest request);

    void deleteJobHistory(Long employeeId, Long jobHistoryId);
}
