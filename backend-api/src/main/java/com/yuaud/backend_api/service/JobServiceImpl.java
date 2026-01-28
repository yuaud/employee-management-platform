package com.yuaud.backend_api.service;


import com.yuaud.backend_api.dto.employee.SortDirection;
import com.yuaud.backend_api.dto.job.*;
import com.yuaud.backend_api.entity.Employee;
import com.yuaud.backend_api.entity.Job;
import com.yuaud.backend_api.repository.EmployeeRepository;
import com.yuaud.backend_api.repository.JobRepository;
import com.yuaud.backend_api.service.interfaces.JobService;
import com.yuaud.backend_api.specification.JobSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

import com.yuaud.backend_api.dto.job.mapper.JobMapper;

import static com.yuaud.backend_api.dto.job.mapper.JobMapper.toDetailResponse;
import static com.yuaud.backend_api.dto.job.mapper.JobMapper.toResponse;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<JobResponse> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        if(jobs.isEmpty()){
        }
        return jobs
                .stream()
                .map(j -> JobMapper.toResponse(j))
                .toList();
    }

    @Override
    public Page<JobResponse> filterJobs(JobFilterRequest request, Pageable pageable){
        Specification<Job> spec = JobSpecification.filter(request);
        Sort sort = Sort.unsorted();
        if(request.sort() != null){
            Sort.Order order = new Sort.Order(
                    request.sort().direction() == SortDirection.ASC ? Sort.Direction.ASC : Sort.Direction.DESC,
                    request.sort().field().field()
            );
            sort = Sort.by(order);
        }
        Pageable pageableWithSort = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );
        Page<JobResponse> response = jobRepository.findAll(spec, pageableWithSort)
                .map(JobMapper::toResponse);
        return response;
    }

    @Override
    public JobDetailResponse getJobById(String jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("Job not found by id: " + jobId));
        List<Employee> employees = employeeRepository.findByJob_JobId(jobId);
        return toDetailResponse(job, employees);
    }

    @Override
    public List<JobResponse> getJobsByTitle(String jobTitle) {
        List<Job> jobs = jobRepository.findByJobTitleContainingIgnoreCase(jobTitle);
        if(jobs.isEmpty()){
            throw new EntityNotFoundException("No jobs were found with this title");
        }
        return jobs
                .stream()
                .map(JobMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public JobResponse createJob(JobCreateRequest request){
        if(jobRepository.existsById(request.jobId())){
            throw new IllegalStateException(
                    "Job already exists with id: " + request.jobId()
            );
        }
        Job job = new Job().builder()
                .jobId(request.jobId())
                .jobTitle(request.jobTitle())
                .build();
        Job savedJob = jobRepository.save(job);
        return toResponse(savedJob);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public JobResponse updateJob(String jobId, JobUpdateRequest request){
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Job not found by id: "+ jobId)
                );
        if(request.jobTitle() != null){
            if(request.jobTitle().isBlank()){
                throw new IllegalStateException("Job Title cannot be blank");
            }
            job.setJobTitle(request.jobTitle().trim());
        }
        Job updatedJob = jobRepository.save(job);
        Long employee_count = employeeRepository.countByJob_JobId(updatedJob.getJobId());
        return toResponse(updatedJob);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public void deleteJobById(String jobId){
        if(!jobRepository.existsById(jobId)){
            throw new EntityNotFoundException("Job does not exists with id: "+ jobId);
        }
        if(employeeRepository.existsByJob_JobId(jobId)){
            throw new IllegalStateException("Job is used by one or more Employees");
        }
        jobRepository.deleteById(jobId);
    }

}
