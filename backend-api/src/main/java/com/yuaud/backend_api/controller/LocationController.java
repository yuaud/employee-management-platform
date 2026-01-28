package com.yuaud.backend_api.controller;

import com.yuaud.backend_api.dto.country.CountryResponse;
import com.yuaud.backend_api.dto.department.DepartmentResponse;
import com.yuaud.backend_api.dto.location.LocationCreateRequest;
import com.yuaud.backend_api.dto.location.LocationFilterRequest;
import com.yuaud.backend_api.dto.location.LocationResponse;
import com.yuaud.backend_api.dto.location.LocationUpdateRequest;
import com.yuaud.backend_api.service.CountryServiceImpl;
import com.yuaud.backend_api.service.LocationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationServiceImpl locationService;
    private final CountryServiceImpl countryService;

    @Operation(summary = "Get all countries")
    @GetMapping("/countries")
    public ResponseEntity<List<CountryResponse>> getAllCountries(){
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @Operation(summary = "Get all locations")
    @GetMapping
    public ResponseEntity<List<LocationResponse>> getAllLocations(){
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    @Operation(summary = "Filter Locations")
    @PostMapping("/filter")
    public ResponseEntity<Page<LocationResponse>> filterLocations(
            @RequestBody LocationFilterRequest request,
            Pageable pageable
            ) {
        return ResponseEntity.ok(locationService.filterLocations(request, pageable));
    }


    @Operation(summary = "Get location by given location id")
    @GetMapping("/{locationId}")
    public ResponseEntity<LocationResponse> getLocationById(
            @PathVariable Long locationId
    ) {
        return ResponseEntity.ok(locationService.getLocationById(locationId));
    }

    @Operation(
            summary = "Get all departments by given location",
            description = "Get all departments by given location id"
    )
    @GetMapping("/{locationId}/departments")
    public ResponseEntity<List<DepartmentResponse>> getAllDepartmentsByLocation(
            @PathVariable Long locationId
    ) {
        return ResponseEntity.ok(locationService.getAllDepartmentsByLocation(locationId));
    }

    @Operation(summary = "Create a new location")
    @PostMapping
    public ResponseEntity<LocationResponse> createLocation(
            @Valid @RequestBody LocationCreateRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(locationService.createLocation(request));
    }

    @Operation(summary = "Update a location by given location id")
    @PutMapping("/{locationId}")
    public ResponseEntity<LocationResponse> updateLocation(
            @PathVariable Long locationId,
            @Valid @RequestBody LocationUpdateRequest request
            ){
        return ResponseEntity.ok(locationService.updateLocation(locationId, request));
    }

    @Operation(summary = "Delete a location by given location id")
    @DeleteMapping("/{locationId}")
    public ResponseEntity<Void> deleteLocation(
            @PathVariable Long locationId
    ){
        locationService.deleteLocationById(locationId);
        return ResponseEntity.noContent().build();
    }

}
