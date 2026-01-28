package com.yuaud.backend_api.dto.location.mapper;

import com.yuaud.backend_api.dto.country.CountryLightResponse;
import com.yuaud.backend_api.dto.country.CountryResponse;
import com.yuaud.backend_api.dto.location.LocationLightDepartmentResponse;
import com.yuaud.backend_api.dto.location.LocationLightResponse;
import com.yuaud.backend_api.dto.location.LocationResponse;
import com.yuaud.backend_api.dto.region.RegionResponse;
import com.yuaud.backend_api.entity.Location;
import com.yuaud.backend_api.entity.Region;

import java.util.List;

public class LocationMapper {
    public static LocationResponse toResponse(Location location){
        if(location == null) return null;
        CountryResponse countryResponse = null;
        if(location.getCountry() != null){
            Region region = location.getCountry().getRegion();
            RegionResponse regionResponse = region != null
                    ? new RegionResponse(region.getRegionId(), region.getRegionName())
                    : null;
            countryResponse = new CountryResponse(
                    location.getCountry().getCountryId(),
                    location.getCountry().getCountryName(),
                    regionResponse
            );
        }
        List<LocationLightDepartmentResponse> lightDepartmentResponseList = null;
        if(location.getDepartments() != null){
            lightDepartmentResponseList = location.getDepartments()
                    .stream()
                    .map(department -> new LocationLightDepartmentResponse(
                            department.getDepartmentId(),
                            department.getDepartmentName()
                    ))
                    .toList();
        }
        return new LocationResponse(
                location.getLocationId(),
                location.getStreetAddress(),
                location.getPostalCode(),
                location.getCity(),
                countryResponse,
                lightDepartmentResponseList,
                location.getCreatedAt(),
                location.getUpdatedAt()
        );
    }
    public static LocationLightResponse toLightResponse(Location location){
        if(location == null) return null;
        CountryLightResponse countryLightResponse = null;
        if(location.getCountry() != null){
            countryLightResponse = new CountryLightResponse(
                    location.getCountry().getCountryId(),
                    location.getCountry().getCountryName()
            );
        }
        return new LocationLightResponse(
                location.getLocationId(),
                countryLightResponse,
                location.getCity()
        );
    }
}
