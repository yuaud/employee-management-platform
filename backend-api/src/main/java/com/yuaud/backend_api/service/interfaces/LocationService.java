package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.dto.location.LocationCreateRequest;
import com.yuaud.backend_api.dto.location.LocationFilterRequest;
import com.yuaud.backend_api.dto.location.LocationResponse;
import com.yuaud.backend_api.dto.location.LocationUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LocationService {
    List<LocationResponse> getAllLocations();

    Page<LocationResponse> filterLocations(LocationFilterRequest filter, Pageable pageable);

    LocationResponse getLocationById(Long locationId);

    List<DepartmentResponse> getAllDepartmentsByLocation(Long locationId);

    LocationResponse createLocation(LocationCreateRequest request);

    LocationResponse updateLocation(Long locationId, LocationUpdateRequest request);

    void deleteLocationById(Long locationId);
}
