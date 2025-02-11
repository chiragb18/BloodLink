package com.project.service;

import com.project.entity.BloodInventory;
import com.project.entity.BloodType;
import com.project.repository.BloodInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BloodInventoryServiceImpl implements BloodInventoryService {

    @Autowired
    private BloodInventoryRepository bloodInventoryRepository;

    @Override
    public Optional<BloodInventory> getInventoryByBloodType(BloodType bloodType) {
        return bloodInventoryRepository.findByBloodType(bloodType);
    }

    @Override
    public void updateInventory(BloodInventory bloodInventory) {
        bloodInventoryRepository.save(bloodInventory);
    }
}
