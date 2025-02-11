package com.project.repository;

import com.project.entity.BloodCollection;
import com.project.entity.BloodType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodCollectionRepository extends JpaRepository<BloodCollection, Long> {
    List<BloodCollection> findByBloodType(BloodType bloodType);
}
