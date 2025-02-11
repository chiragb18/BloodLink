package com.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.BloodIssue;
import com.project.entity.BloodRequest;

public interface BloodIssueRepository extends JpaRepository<BloodIssue, Long> {
	Optional<BloodIssue> findByBloodRequest(BloodRequest bloodRequest);
}
