package com.project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@EnableWebSecurity
@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final CustomJwtAuthenticationFilter jwtFilter;

  
   

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(requests -> requests
                .requestMatchers("/users/register", "/users/login", "/v*/api-doc*/**", "/swagger-ui/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                .requestMatchers("/donation-requests/blood-request").hasRole("DONOR")
                .requestMatchers("/users/").hasRole("ADMIN")  // Get all users
                .requestMatchers("/users/{id}").hasRole("ADMIN")  // Get user by ID
                .requestMatchers("/users/{id}").hasRole("ADMIN")  // Delete user
                .requestMatchers("/blood-requests/create").hasRole("HOSPITAL")  // Hospital can create blood requests
             .requestMatchers("/blood-requests/").hasRole("ADMIN")  // Admin can view all blood requests
              .requestMatchers("/blood-requests/approve/{requestId}").hasRole("ADMIN")  // Admin can approve blood requests
              .requestMatchers("/blood-requests/reject/{requestId}").hasRole("ADMIN")  // Admin can reject blood requests
             .requestMatchers("/blood-requests/approve-remaining/{requestId}").hasRole("ADMIN")  // Admin approves remaining blood requests



                .requestMatchers("/donation-requests/pending", "/donation-requests/approve/**", "/donation-requests/delete/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
 
}
