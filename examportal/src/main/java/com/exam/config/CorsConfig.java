package com.exam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

/**
 * Configuration class to enable Cross-Origin Resource Sharing (CORS) for the application.
 * This allows the frontend (running on a different origin) to communicate with the backend.
 */
@Configuration
public class CorsConfig {

    /**
     * Bean definition for CORS filter.
     * This filter intercepts requests and applies the specified CORS policy.
     * 
     * @return CorsFilter instance with defined CORS configuration.
     */
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Allows sending credentials (cookies, authorization headers, etc.) with cross-origin requests
        corsConfig.setAllowCredentials(true);

        // Specifies the allowed origin (frontend application URL)
        corsConfig.setAllowedOrigins(List.of("http://localhost:4200")); // Modify as needed for production
        
        // Defines the HTTP methods allowed in CORS requests
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Defines the headers that can be included in requests
        corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

        // Registers the configuration for all API endpoints (/** means all paths)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        // Returns a new CORS filter with the configured settings
        return new CorsFilter(source);
    }
}
