package com.yuaud.backend_api.repository;

import com.yuaud.backend_api.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>,
        JpaSpecificationExecutor<Employee> {
    boolean existsByEmail(String email);

    @Query("""
            select e
            from Employee e
            where size(e.subordinates) > 0
            """)
    List<Employee> findAllManagers();

    List<Employee> findByIsManager(Boolean isManager);

    @Query("""
            select e
            from Employee e
            where e.employeeId = :id
                and size(e.subordinates) > 0
            """)
    Optional<Employee> findManagerById(@Param("id") Long id);


    // get all employees by departmentId
    List<Employee> findByDepartment_DepartmentId(Long departmentId);

    List<Employee> findByJob_JobId(String jobId);
    Long countByJob_JobId(String jobId);
    boolean existsByJob_JobId(String jobId);
}
