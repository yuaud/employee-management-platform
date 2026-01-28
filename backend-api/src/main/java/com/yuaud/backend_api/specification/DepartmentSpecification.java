package com.yuaud.backend_api.specification;

import com.yuaud.backend_api.dto.department.DepartmentFilterRequest;
import com.yuaud.backend_api.entity.Department;
import com.yuaud.backend_api.entity.Location;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class DepartmentSpecification {
    public static Specification<Department> filter(DepartmentFilterRequest filter){
        return (Root<Department> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();

            if(filter.departmentName() != null && !filter.departmentName().isBlank()){
                String like = "%" + filter.departmentName().toLowerCase() + "%";
                Predicate departmentName = cb.like(cb.lower(root.get("departmentName")), like);
                predicate = cb.and(
                        predicate,
                        departmentName
                );
            }
            if(filter.locationId() != null){
                predicate = cb.and(
                        predicate,
                        cb.equal(root.get("location").get("locationId"), filter.locationId())
                );
            }
          return predicate;
        };
    }
}
