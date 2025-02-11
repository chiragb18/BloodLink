package com.project.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.project.dto.BloodDonationRequestDTO;
import com.project.entity.BloodDonationRequest;
import com.project.entity.DonationStatus;

public interface BloodDonationRequestService {
//    List<BloodDonationRequest> getAllPendingRequests(); // Method to get all pending requests
//    BloodDonationRequest approveRequest(Long requestId); // Method to approve a request
	List<BloodDonationRequest> getAllPendingRequests(); // Method to get all pending requests
    BloodDonationRequest approveRequest(Long requestId); // Method to approve a request
    BloodDonationRequest submitDonationRequest(BloodDonationRequestDTO requestDTO); ////
    boolean deleteRequest(Long id);
    Optional<BloodDonationRequest> findFirstByDonorIdAndStatusAndRequestDateAfter(
            Long donorId, 
            DonationStatus status, 
            LocalDate requestDate
        );
}
