package com.yuaud.backend_api.service;

import com.yuaud.backend_api.dto.country.CountryResponse;
import com.yuaud.backend_api.dto.region.RegionResponse;
import com.yuaud.backend_api.entity.Country;
import com.yuaud.backend_api.repository.CountryRepository;
import com.yuaud.backend_api.service.interfaces.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    public List<CountryResponse> getAllCountries(){
        List<Country> countries = countryRepository.findAll(
                Sort.by(Sort.Direction.ASC, "countryName")
        );
        return countries.stream()
                .map(country -> new CountryResponse(
                        country.getCountryId(),
                        country.getCountryName(),
                        new RegionResponse(
                                country.getRegion().getRegionId(),
                                country.getRegion().getRegionName()
                        )
                    )
                )
                .toList();
    }

}
