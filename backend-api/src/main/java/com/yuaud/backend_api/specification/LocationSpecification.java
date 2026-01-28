package com.yuaud.backend_api.specification;

import com.yuaud.backend_api.dto.location.LocationFilterRequest;
import com.yuaud.backend_api.entity.Department;
import com.yuaud.backend_api.entity.Location;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class LocationSpecification {
    public static Specification<Location> filter(LocationFilterRequest filter){
        return (Root<Location> root,CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();
            //countryName
            if(filter.country() != null && !filter.country().isBlank()){
                String like = "%" + filter.country().toLowerCase() + "%";
                Predicate country = cb.like(cb.lower(root.get("country").get("countryName")), like);
                predicate = cb.and(
                        predicate,
                        country
                );
            }
            //city
            if(filter.city() != null && !filter.city().isBlank()){
                String like = "%" + filter.city().toLowerCase() + "%";
                Predicate city = cb.like(cb.lower(root.get("city")), like);
                predicate = cb.and(
                        predicate,
                        city
                );
            }
            if(filter.postalCode() != null && !filter.postalCode().isBlank()){
                String like = "%" + filter.postalCode().toLowerCase() + "%";
                Predicate postalCode = cb.like(cb.lower(root.get("postalCode")), like);
                predicate = cb.and(
                        predicate,
                        postalCode
                );
            }
            //department id
            if(filter.departmentId() != null){
                Join<Location, Department> departmentJoin = root.join("departments", JoinType.LEFT);
                predicate = cb.and(
                        predicate,
                        cb.equal(
                                departmentJoin.get("departmentId"),
                                filter.departmentId()
                        )
                );
                query.distinct(true);
            }
            return predicate;
        };
    }
}
