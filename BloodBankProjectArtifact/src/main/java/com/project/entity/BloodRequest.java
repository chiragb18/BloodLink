package com.project.entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unidirectional relationship with cascade delete: BloodRequest knows about the hospital (User)
    @ManyToOne(cascade = CascadeType.REMOVE)  // This ensures that BloodRequest is deleted when the User is deleted
    @JoinColumn(name = "hospital_id", nullable = false)
    private User hospital;  // This is the hospital, no need for reference back in BloodRequest

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    private int quantity; // Requested quantity

    private int remainingQuantity; // Track how much is still needed

    @Enumerated(EnumType.STRING)
    private BloodRequestStatus status;
}
