package com.project.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BloodDonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    @JsonIgnore
    private User donor;
    

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private DonationStatus status = DonationStatus.PENDING;

    private LocalDate requestDate = LocalDate.now();
}
