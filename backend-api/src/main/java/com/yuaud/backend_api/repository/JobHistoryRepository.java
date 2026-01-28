package com.yuaud.backend_api.repository;

import com.yuaud.backend_api.entity.JobHistory;
import com.yuaud.backend_api.entity.JobHistoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobHistoryRepository extends JpaRepository<JobHistory, Long> {

    @Query("""
            SELECT jh
            FROM JobHistory jh
            WHERE jh.employee.employeeId = :employeeId
            """)
    List<JobHistory> findJobHistoriesByEmployeeId(@Param("employeeId") Long employeeId);

    // find a job history which is belongs to given employee
    //        @Query("""
    //                SELECT jh
    //                FROM JobHistory jh
    //                WHERE jh.employee.employeeId = :employeeId
    //                and jh.jobHistoryId = :jobHistoryId
    //                """)
    Optional<JobHistory> findByJobHistoryIdAndEmployeeEmployeeId(
            Long jobHistoryId,
            Long employeeId
    );

}
