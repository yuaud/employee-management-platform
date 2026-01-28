package com.yuaud.backend_api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;


@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Employee Management REST API",
                version = "1.0",
                description = "Employee, Department, Job, Location and JobHistory APIs"
        )
)
public class OpenApiConfig {
}
