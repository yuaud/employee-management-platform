package com.yuaud.backend_api.repository;

import com.yuaud.backend_api.dto.job.JobResponse;
import com.yuaud.backend_api.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String>, JpaSpecificationExecutor<Job> {

    List<Job> findByJobTitleContainingIgnoreCase(String jobTitle);

}
