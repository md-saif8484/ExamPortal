package com.exam.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.exam.service.impl.UserDetailsServiceImpl;

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class MySecurityConfig {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	@Autowired
	private JwtAuthenticationFilter authenticationFilter;
	
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
        .csrf(csrf -> csrf.disable()) // Disable CSRF for JWT-based authentication
        .authorizeHttpRequests(auth -> auth
        	.requestMatchers(HttpMethod.OPTIONS).permitAll() // Allow all OPTIONS requests
            .requestMatchers("generate-token", "/user/").permitAll()  // Allow these endpoints without authentication
            .requestMatchers("/admin/**").hasRole("ADMIN")  // Protect admin routes
            .anyRequest().authenticated() // All other requests require authentication
        )
        .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler)) // Handle unauthorized access
        .sessionManagement(session -> session.sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS)); // Make it stateless
        
		http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

		return http.build();
    }
	
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(this.userDetailsServiceImpl);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }
	
	@Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(authenticationProvider()));
    }
	
	
}
