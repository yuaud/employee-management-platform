package com.yuaud.backend_api.service;

import com.yuaud.backend_api.dto.jobHistory.JobHistoryCreateRequest;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryResponse;
import com.yuaud.backend_api.dto.jobHistory.JobHistoryUpdateRequest;
import com.yuaud.backend_api.dto.jobHistory.mapper.JobHistoryMapper;
import com.yuaud.backend_api.entity.Employee;
import com.yuaud.backend_api.entity.JobHistory;
import com.yuaud.backend_api.repository.EmployeeRepository;
import com.yuaud.backend_api.repository.JobHistoryRepository;
import com.yuaud.backend_api.service.interfaces.JobHistoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobHistoryServiceImpl implements JobHistoryService {

    private final JobHistoryRepository jobHistoryRepository;
    private final EmployeeRepository employeeRepository;


    @Override
    public List<JobHistoryResponse> getJobHistoryByEmployee(Long employeeId){
        if(!employeeRepository.existsById(employeeId)){
            throw new EntityNotFoundException("Employee not found with id: "+employeeId);
        }
        List<JobHistory> jobHistories = jobHistoryRepository.findJobHistoriesByEmployeeId(employeeId);
        if(jobHistories.isEmpty()){}
        return jobHistories
                .stream()
                .map(JobHistoryMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public JobHistoryResponse createJobHistory(Long employeeId, JobHistoryCreateRequest request) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: "+employeeId));
        if(request.endDate() != null && request.endDate().isBefore(request.startDate())){
            throw new IllegalArgumentException("End Date cannot be before Start Date");
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setCompanyName(request.companyName());
        jobHistory.setStartDate(request.startDate());
        jobHistory.setEndDate(request.endDate());
        jobHistory.setEmployee(employee);
        jobHistory.setJob(request.jobId());
        JobHistory saved = jobHistoryRepository.save(jobHistory);
        return JobHistoryMapper.toResponse(saved);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public JobHistoryResponse updateJobHistory(Long jobHistoryId, JobHistoryUpdateRequest request) {
        JobHistory jobHistory = jobHistoryRepository.findById(jobHistoryId)
                .orElseThrow(() -> new EntityNotFoundException("Job History not found with id: "+jobHistoryId));
        if(request.startDate() != null) jobHistory.setStartDate(request.startDate());
        if(request.endDate() != null) jobHistory.setEndDate(request.endDate());
        if(StringUtils.hasText(request.jobId())){
            jobHistory.setJob(request.jobId());
        }
        JobHistory updated = jobHistoryRepository.save(jobHistory);
        return JobHistoryMapper.toResponse(updated);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public void deleteJobHistory(Long employeeId, Long jobHistoryId) {
        JobHistory jobHistory = jobHistoryRepository.findByJobHistoryIdAndEmployeeEmployeeId(jobHistoryId, employeeId)
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Job History not found for employeeId= " + employeeId
                                + ", jobHistoryId= " + jobHistoryId
                        ));
        jobHistoryRepository.delete(jobHistory);
    }
}
