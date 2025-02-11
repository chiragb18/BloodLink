package com.project.service;

import com.project.entity.BloodInventory;
import com.project.entity.BloodType;

import java.util.Optional;

public interface BloodInventoryService {
    Optional<BloodInventory> getInventoryByBloodType(BloodType bloodType);
    void updateInventory(BloodInventory bloodInventory);
}
