package com.yuaud.backend_api.specification;

import com.yuaud.backend_api.dto.employee.EmployeeFilterRequest;
import com.yuaud.backend_api.entity.Employee;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {
    public static Specification<Employee> filter(EmployeeFilterRequest filter) {
        return (Root<Employee> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();

            //department
            if(filter.departmentId() != null){
                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("department").get("departmentId"),
                                filter.departmentId()
                        )
                );
            }

            //job
            if(filter.jobTitle() != null) {
                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("job").get("jobTitle"),
                                filter.jobTitle()
                        )
                );
            }

            //manager (hangi managera bagli)
            if(filter.managerId() != null){
                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("manager").get("employeeId"),
                                filter.managerId()
                        )
                );
            }

            //isManager (employee mi manager mi)
            if(filter.isManager() != null){
                predicate = cb.and(
                        predicate,
                        cb.equal(root.get("isManager"), filter.isManager())
                );
            }

            //search (firstName + lastName + email)
            if(filter.search() != null && !filter.search().isBlank()){
                String like = "%" + filter.search().toLowerCase() + "%";

                Predicate firstName = cb.like(cb.lower(root.get("firstName")), like);
                Predicate lastName = cb.like(cb.lower(root.get("lastName")), like);
                Predicate email = cb.like(cb.lower(root.get("email")), like);

                predicate = cb.and(
                        predicate,
                        cb.or(firstName, lastName, email)
                );
            }

            return predicate;
        };
    }
}
