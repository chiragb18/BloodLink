package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class BloodCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;
   

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    private int quantity;
    private LocalDate collectionDate;
    private LocalDate expiryDate;
}
