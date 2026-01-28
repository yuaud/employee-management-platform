package com.yuaud.backend_api.dto.job.mapper;

import com.yuaud.backend_api.dto.employee.EmployeeResponseUltraLight;
import com.yuaud.backend_api.dto.job.JobDetailResponse;
import com.yuaud.backend_api.dto.job.JobResponse;
import com.yuaud.backend_api.entity.Employee;
import com.yuaud.backend_api.entity.Job;

import java.util.List;

public class JobMapper {
    public static JobResponse toResponse(Job job){
        return new JobResponse(
                job.getJobId(),
                job.getJobTitle(),
                job.getCreatedAt(),
                job.getUpdatedAt(),
                0L
        );
    }

    public static JobDetailResponse toDetailResponse(Job job, List<Employee> employees){
        if(job == null) return null;
        List<EmployeeResponseUltraLight> employeeResponseUltraLight = null;
        if(employees != null){
            employeeResponseUltraLight = employees
                    .stream()
                    .map((employee) -> new EmployeeResponseUltraLight(
                            employee.getEmployeeId(),
                            employee.getFileUrl(),
                            employee.getFirstName(),
                            employee.getLastName(),
                            employee.getEmail(),
                            employee.getHireDate(),
                            employee.getIsManager()
                    ))
                    .toList();
        }
        return new JobDetailResponse(
                job.getJobId(),
                job.getJobTitle(),
                job.getCreatedAt(),
                job.getUpdatedAt(),
                employeeResponseUltraLight.size(),
                employeeResponseUltraLight
        );
    }

}
