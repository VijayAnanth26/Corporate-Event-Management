package com.event.vijay.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.*;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.event.vijay.enumerated.Role;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String AUTH_ENDPOINT = "/api/v1/auth";
    private static final List<String> ALLOWED_ORIGINS = Arrays.asList(
        "http://localhost:4000", 
        "http://localhost:5173", 
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:4000",
        "http://127.0.0.1:8080"
    );
    private static final List<String> ALLOWED_HEADERS = Arrays.asList(AUTHORIZATION, CONTENT_TYPE);
    private static final List<String> ALLOWED_METHODS = Arrays.asList(
        GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), HEAD.name()
    );
    private static final List<String> EXPOSED_HEADERS = Arrays.asList(AUTHORIZATION, CONTENT_TYPE);

    @Autowired
    private AuthenticationProvider authenticationProvider;
    
    @Autowired
    private JwtAuthenticationConfig jwtAuthenticationConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(configurationSource()))
        .authorizeHttpRequests(authorize -> authorize
                // Public endpoints
                .requestMatchers(AUTH_ENDPOINT + "/**").permitAll()
                .requestMatchers(GET, "/api/v1/event/all").permitAll()
                .requestMatchers(GET, "/api/v1/event/{id}").permitAll()
                
                // Admin-only endpoints
                .requestMatchers(POST, "/api/v1/event/add").hasAuthority(Role.ADMIN.name())
                .requestMatchers(PUT, "/api/v1/event/{id}").hasAuthority(Role.ADMIN.name())
                .requestMatchers(DELETE, "/api/v1/event/{id}").hasAuthority(Role.ADMIN.name())
                .requestMatchers(GET, "/api/v1/user/all").hasAuthority(Role.ADMIN.name())
                .requestMatchers(GET, "/api/v1/booking/all").hasAuthority(Role.ADMIN.name())
                .requestMatchers(GET, "/api/v1/payment/all").hasAuthority(Role.ADMIN.name())
                
                // Authenticated user endpoints
                .requestMatchers("/api/v1/booking/**").authenticated()
                .requestMatchers("/api/v1/payment/**").authenticated()
                .requestMatchers("/api/v1/user/**").authenticated()
                .requestMatchers("/api/v1/event/**").authenticated()
                
                .anyRequest()
                .authenticated())
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationConfig, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource configurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(ALLOWED_ORIGINS);
        corsConfiguration.setAllowedHeaders(ALLOWED_HEADERS);
        corsConfiguration.setAllowedMethods(ALLOWED_METHODS);
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(EXPOSED_HEADERS);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
