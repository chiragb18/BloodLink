package com.project.repository;

import com.project.entity.BloodRequest;
import com.project.entity.BloodRequestStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

	List<BloodRequest> findByStatus(BloodRequestStatus pending);
}
