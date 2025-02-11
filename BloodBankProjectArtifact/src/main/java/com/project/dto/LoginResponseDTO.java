package com.project.dto;

import com.project.entity.BloodType;
import com.project.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginResponseDTO {
    private Long id;
    private String name;
    private Role role;
    private BloodType bloodType;
    private String jwtToken;
}
