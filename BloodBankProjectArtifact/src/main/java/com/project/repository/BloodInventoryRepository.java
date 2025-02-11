package com.project.repository;

import com.project.entity.BloodInventory;
import com.project.entity.BloodType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
    Optional<BloodInventory> findByBloodType(BloodType bloodType);
}
