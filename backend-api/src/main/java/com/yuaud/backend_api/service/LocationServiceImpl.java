package com.yuaud.backend_api.service;

import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.dto.department.mapper.DepartmentMapper;
import com.yuaud.backend_api.dto.employee.SortDirection;
import com.yuaud.backend_api.dto.location.LocationCreateRequest;
import com.yuaud.backend_api.dto.location.LocationFilterRequest;
import com.yuaud.backend_api.dto.location.LocationResponse;
import com.yuaud.backend_api.dto.location.LocationUpdateRequest;
import com.yuaud.backend_api.entity.Country;
import com.yuaud.backend_api.entity.Location;
import com.yuaud.backend_api.repository.CountryRepository;
import com.yuaud.backend_api.repository.DepartmentRepository;
import com.yuaud.backend_api.repository.LocationRepository;
import com.yuaud.backend_api.service.interfaces.LocationService;

import com.yuaud.backend_api.dto.location.mapper.LocationMapper;
import com.yuaud.backend_api.specification.LocationSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import static com.yuaud.backend_api.dto.location.mapper.LocationMapper.toResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;
    private final CountryRepository countryRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public List<LocationResponse> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        if(locations.isEmpty()){
            return locations
                    .stream()
                    .map(LocationMapper::toResponse)
                    .toList();
        }
        return locations
                .stream()
                .map(LocationMapper::toResponse)
                .toList();
    }

    @Override
    public Page<LocationResponse> filterLocations(
            LocationFilterRequest request,
            Pageable pageable
    ) {
        Specification<Location> spec = LocationSpecification.filter(request);
        Sort sort = Sort.unsorted();
        if(request.sort() != null){
            Sort.Order order = new Sort.Order(
                    request.sort().direction() == SortDirection.ASC ? Sort.Direction.ASC : Sort.Direction.DESC,
                    request.sort().field().field()
            );
            sort = Sort.by(order);
        }
        Pageable pageableWithSort = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );
        Page<LocationResponse> response = locationRepository.findAll(spec, pageableWithSort)
                .map(LocationMapper::toResponse);
        return response;
    }

    @Override
    public LocationResponse getLocationById(Long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new EntityNotFoundException("Location does not exists with id: "+ locationId));
        return toResponse(location);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    @Transactional
    public LocationResponse createLocation(LocationCreateRequest request) {
        Location location = new Location();
        if(StringUtils.hasText(request.streetAddress())) location.setStreetAddress(request.streetAddress().trim());
        if(StringUtils.hasText(request.postalCode())) location.setPostalCode(request.postalCode().trim());
        location.setCity(request.city());
        if(request.countryId() != null){
            Country country = countryRepository.findById(request.countryId())
                    .orElseThrow(() -> new EntityNotFoundException("Country not found with id: "+ request.countryId()));
            location.setCountry(country);
        }
        location.setDepartments(new ArrayList<>());
        Location saved = locationRepository.save(location);
        return toResponse(saved);
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public LocationResponse updateLocation(Long locationId, LocationUpdateRequest request) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new EntityNotFoundException("Location not found with id: "+ locationId));
        if(StringUtils.hasText(request.streetAddress())){
            location.setStreetAddress(request.streetAddress().trim());
        }
        if(StringUtils.hasText(request.postalCode())){
            location.setPostalCode(request.postalCode().trim());
        }
        if(StringUtils.hasText(request.city())){
            location.setCity(request.city().trim());
        }
        if(StringUtils.hasText(request.countryId())){
            Country country = countryRepository.findById(request.countryId())
                    .orElseThrow(() -> new EntityNotFoundException("Country not found with id: "+ request.countryId()));
            location.setCountry(country);
        }
        Location updated = locationRepository.save(location);
        return toResponse(updated);
    }

    @Override
    public List<DepartmentResponse> getAllDepartmentsByLocation(Long locationId){
        if(!locationRepository.existsById(locationId)){
            throw new EntityNotFoundException("Location not found with id: "+locationId);
        }
        return departmentRepository.findByLocation_LocationId(locationId)
                .stream()
                .map(DepartmentMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('admin')")
    public void deleteLocationById(Long locationId) {
        if(!locationRepository.existsById(locationId)){
            throw new EntityNotFoundException("Location does not exists with id: "+ locationId);
        }
        if(departmentRepository.existsByLocation_LocationId(locationId)){
            throw new IllegalStateException("Location is used by one or more departments");
        }
        locationRepository.deleteById(locationId);
    }
}
