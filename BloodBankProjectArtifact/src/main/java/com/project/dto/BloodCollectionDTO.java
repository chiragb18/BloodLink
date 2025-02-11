package com.project.dto;

import java.time.LocalDate;

import com.project.entity.BloodType;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BloodCollectionDTO {
    private Long donorId;
    
    @NotNull(message = "Blood type is required")
    private BloodType bloodType;

    private int quantity;
    private LocalDate collectionDate;
}
