package com.project.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.BloodDonationRequest;
import com.project.entity.DonationStatus;
import com.project.entity.User;

public interface BloodDonationRequestRepository extends JpaRepository<BloodDonationRequest, Long> {
    List<BloodDonationRequest> findByDonor(User donor);
    List<BloodDonationRequest> findByStatus(DonationStatus status);
	boolean existsByDonorAndStatusAndRequestDateAfter(User donor, DonationStatus approved, LocalDate oneMonthAgo);
	 Optional<BloodDonationRequest> findFirstByDonorIdAndStatusAndRequestDateAfter(
		        Long donorId, 
		        DonationStatus status, 
		        LocalDate requestDate
		    );
}
