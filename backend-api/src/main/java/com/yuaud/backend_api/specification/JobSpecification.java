package com.yuaud.backend_api.specification;

import com.yuaud.backend_api.dto.job.JobFilterRequest;
import com.yuaud.backend_api.entity.Job;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class JobSpecification {
    public static Specification<Job> filter(JobFilterRequest filter){
        return (Root <Job> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();

            //search by jobTitle
            if(filter.search() != null && !filter.search().isBlank()){
                String like = "%" + filter.search().toLowerCase() + "%";
                Predicate jobTitle = cb.like(cb.lower(root.get("jobTitle")), like);
                predicate = cb.and(
                        predicate,
                        jobTitle
                );
            }

            return predicate;
        };
    }
}
