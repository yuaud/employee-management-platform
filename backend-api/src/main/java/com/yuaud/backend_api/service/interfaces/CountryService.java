package com.yuaud.backend_api.service.interfaces;

import com.yuaud.backend_api.dto.country.CountryResponse;

import java.util.List;

public interface CountryService {
    List<CountryResponse> getAllCountries();
}
