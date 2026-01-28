package com.yuaud.backend_api.dto.jobHistory.mapper;

import com.yuaud.backend_api.dto.job.mapper.JobMapper;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryResponse;
import com.yuaud.backend_api.entity.JobHistory;

public class JobHistoryMapper {
    public static JobHistoryResponse toResponse(JobHistory jobHistory){
        if(jobHistory == null) return null;
        return new JobHistoryResponse(
                jobHistory.getJobHistoryId(),
                jobHistory.getEmployee().getEmployeeId(),
                jobHistory.getCompanyName(),
                jobHistory.getStartDate(),
                jobHistory.getEndDate(),
                jobHistory.getJob()
        );
    }
}
