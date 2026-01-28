package com.yuaud.backend_api.repository;

import com.yuaud.backend_api.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long>, JpaSpecificationExecutor<Department> {
    boolean existsByDepartmentName(String departmentName);

    //Get all departments by location
    List<Department> findByLocation_LocationId(Long locationId);

    boolean existsByLocation_LocationId(Long locationId);
}
