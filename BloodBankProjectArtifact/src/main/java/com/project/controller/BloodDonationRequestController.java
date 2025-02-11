package com.project.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.BloodDonationRequestDTO;
import com.project.dto.DonationEligibilityResponse;
import com.project.entity.BloodDonationRequest;
import com.project.entity.DonationStatus;
import com.project.service.BloodDonationRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/donation-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodDonationRequestController {

    @Autowired
    private BloodDonationRequestService bloodDonationRequestService;
    
   

    //  Donor submits a donation request (handled in SecurityConfig)
    @PostMapping("/blood-request")
    public ResponseEntity<?> submitDonationRequest(@Valid @RequestBody BloodDonationRequestDTO requestDTO) {
        BloodDonationRequest savedRequest = bloodDonationRequestService.submitDonationRequest(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
    }

    //  Admin views all pending donation requests
    @GetMapping("/pending")
    public ResponseEntity<?> getAllPendingRequests() {
        List<BloodDonationRequest> requests = bloodDonationRequestService.getAllPendingRequests();
        return ResponseEntity.ok(requests);
    }

    // Admin approves a donation request
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveRequest(@PathVariable Long id) {
        BloodDonationRequest approvedRequest = bloodDonationRequestService.approveRequest(id);
        return ResponseEntity.ok(approvedRequest);
    }

    //  Admin deletes a donation request
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id) {
        boolean deleted = bloodDonationRequestService.deleteRequest(id);
        if (deleted) {
            return ResponseEntity.ok("Blood donation request deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete request. Request not found.");
        }
    }
    
    
   
    @GetMapping("/donation-eligibility/{donorId}")
    public ResponseEntity<?> checkDonationEligibility(@PathVariable Long donorId) {
        Optional<BloodDonationRequest> donationRequest = bloodDonationRequestService
                .findFirstByDonorIdAndStatusAndRequestDateAfter(donorId, DonationStatus.APPROVED, LocalDate.now().minusMonths(3));

        if (donationRequest.isPresent()) {
            // Donor is eligible for a certificate, return the donation date
            BloodDonationRequest request = donationRequest.get();
            return ResponseEntity.ok(new DonationEligibilityResponse(request.getRequestDate()));
        } else {
            // Donor is not eligible for a certificate
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No approved donation in the last 3 months.");
        }
    }

  
}
