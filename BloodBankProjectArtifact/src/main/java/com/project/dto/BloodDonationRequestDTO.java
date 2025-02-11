package com.project.dto;

import com.project.entity.BloodType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BloodDonationRequestDTO {
	  @NotNull(message = "Donor ID is required")
	    private Long donorId; 

    @NotNull(message = "Blood type is required")
    private BloodType bloodType;

    @Min(value = 1, message = "Quantity should be at least 1 unit")
    private int quantity;
}
