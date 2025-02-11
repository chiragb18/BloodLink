package com.project.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.BloodRequestDTO;
import com.project.entity.BloodInventory;
import com.project.entity.BloodIssue;
import com.project.entity.BloodRequest;
import com.project.entity.BloodRequestStatus;
import com.project.entity.BloodType;
import com.project.entity.User;
import com.project.repository.BloodIssueRepository;
import com.project.repository.BloodRequestRepository;
import com.project.repository.UserRepository;

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private BloodInventoryService bloodInventoryService;

    @Autowired
    private BloodIssueRepository bloodIssueRepository;

    @Override
    public BloodRequest createBloodRequest(BloodRequestDTO requestDTO) {
        Optional<User> hospitalOpt = userRepository.findById(requestDTO.getHospitalId());
        if (hospitalOpt.isEmpty()) {
            throw new RuntimeException("Hospital not found");
        }

        User hospital = hospitalOpt.get();
        BloodRequest bloodRequest = new BloodRequest();
        bloodRequest.setHospital(hospital);
        bloodRequest.setBloodType(requestDTO.getBloodType());
        bloodRequest.setQuantity(requestDTO.getQuantity());
        bloodRequest.setRemainingQuantity(requestDTO.getQuantity());
        bloodRequest.setStatus(BloodRequestStatus.PENDING);

        return bloodRequestRepository.save(bloodRequest);
    }

    @Override
    public List<BloodRequest> getPendingBloodRequests() {
        return bloodRequestRepository.findByStatus(BloodRequestStatus.PENDING);
    }

    @Override
    public List<BloodRequest> getAllBloodRequests() {
        return bloodRequestRepository.findAll();
    }

    
    @Override
    public void approveBloodRequest(Long requestId) {
        Optional<BloodRequest> requestOpt = bloodRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            throw new RuntimeException("Blood request not found");
        }

        BloodRequest bloodRequest = requestOpt.get();
        User hospital = bloodRequest.getHospital();

        Optional<BloodInventory> inventoryOpt = bloodInventoryService.getInventoryByBloodType(bloodRequest.getBloodType());

        // If inventory is empty or no stock available, notify the hospital and request donations from donors
        if (inventoryOpt.isEmpty() || inventoryOpt.get().getAvailableUnits() == 0) {
            String subject = "Regret: Blood Request Cannot Be Approved";
            String body = "Dear " + hospital.getName() + ",\n\n" +
                          "We regret to inform you that your blood request for " + 
                          bloodRequest.getBloodType() + " could not be approved due to insufficient stock.\n" +
                          "Please try again later.\n\n" +
                          "Thank you,\nBlood Bank Management Team";

            emailService.sendEmail(hospital.getEmail(), subject, body);

            // Notify donors about the urgent need for blood donations
            sendDonationRequests(bloodRequest.getId());

            throw new RuntimeException("Insufficient stock for blood type: " + bloodRequest.getBloodType());
        }

        // Proceed with approval if inventory is available
        BloodInventory bloodInventory = inventoryOpt.get();
        int availableUnits = bloodInventory.getAvailableUnits();
        int requestedUnits = bloodRequest.getRemainingQuantity();

        int issuedUnits = Math.min(availableUnits, requestedUnits);
        int remainingUnits = requestedUnits - issuedUnits;

        bloodRequest.setRemainingQuantity(remainingUnits);
        bloodRequest.setStatus(remainingUnits == 0 ? BloodRequestStatus.APPROVED : BloodRequestStatus.PARTIALLY_APPROVED);

        bloodInventory.setAvailableUnits(availableUnits - issuedUnits);
        bloodInventoryService.updateInventory(bloodInventory);

        // Record the issued blood details
        BloodIssue bloodIssue = new BloodIssue();
        bloodIssue.setBloodRequest(bloodRequest);
        bloodIssue.setIssuedQuantity(issuedUnits);
        bloodIssueRepository.save(bloodIssue);

        // Save the updated blood request
        bloodRequestRepository.save(bloodRequest);

        // Notify the hospital about the approval or partial approval
        String subject = remainingUnits == 0 ? "Blood Request Fully Approved" : "Blood Request Partially Approved";
        String body = "Dear " + hospital.getName() + ",\n\n" +
                      "Your blood request for " + bloodRequest.getBloodType() + " has been " + 
                      (remainingUnits == 0 ? "fully approved." : "partially approved. Only " + issuedUnits + " units have been issued.") +
                      "\n\nThank you,\nBlood Bank Management Team";

        emailService.sendEmail(hospital.getEmail(), subject, body);
    }

    

    @Override
    public void approveRemainingBloodRequest(Long requestId) {
        Optional<BloodRequest> requestOpt = bloodRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            throw new RuntimeException("Blood request not found");
        }

        BloodRequest bloodRequest = requestOpt.get();
        if (bloodRequest.getRemainingQuantity() == 0) {
            throw new RuntimeException("No remaining blood quantity to approve");
        }

        Optional<BloodInventory> inventoryOpt = bloodInventoryService.getInventoryByBloodType(bloodRequest.getBloodType());
        if (inventoryOpt.isEmpty()) {
            throw new RuntimeException("Blood inventory not found for blood type: " + bloodRequest.getBloodType());
        }

        BloodInventory bloodInventory = inventoryOpt.get();
        int availableUnits = bloodInventory.getAvailableUnits();
        int remainingUnits = bloodRequest.getRemainingQuantity();

        int issuedUnits = Math.min(availableUnits, remainingUnits);
        bloodRequest.setRemainingQuantity(remainingUnits - issuedUnits);
        bloodRequest.setStatus(bloodRequest.getRemainingQuantity() == 0 ? BloodRequestStatus.APPROVED : BloodRequestStatus.PARTIALLY_APPROVED);

        bloodInventory.setAvailableUnits(availableUnits - issuedUnits);
        bloodInventoryService.updateInventory(bloodInventory);

        Optional<BloodIssue> existingBloodIssueOpt = bloodIssueRepository.findByBloodRequest(bloodRequest);
        if (existingBloodIssueOpt.isPresent()) {
            BloodIssue existingBloodIssue = existingBloodIssueOpt.get();
            existingBloodIssue.setIssuedQuantity(existingBloodIssue.getIssuedQuantity() + issuedUnits);
            bloodIssueRepository.save(existingBloodIssue);
        } else {
            BloodIssue bloodIssue = new BloodIssue();
            bloodIssue.setBloodRequest(bloodRequest);
            bloodIssue.setIssuedQuantity(issuedUnits);
            bloodIssueRepository.save(bloodIssue);
        }

        bloodRequestRepository.save(bloodRequest);

        String subject = "Remaining Blood Request Approved";
        String body = "Dear " + bloodRequest.getHospital().getName() + ",\n\n" +
                      "We have approved additional " + issuedUnits + " units for your blood request of " +
                      bloodRequest.getBloodType() + ".\n\n" +
                      "Thank you,\nBlood Bank Management Team";
        
        emailService.sendEmail(bloodRequest.getHospital().getEmail(), subject, body);
    }
    @Override
    public void sendDonationRequests(Long requestId) {
        Optional<BloodRequest> requestOpt = bloodRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            throw new RuntimeException("Blood request not found");
        }

        BloodRequest bloodRequest = requestOpt.get();
        BloodType requiredBloodType = bloodRequest.getBloodType();
        User hospital = bloodRequest.getHospital();

        // Fetch donors with the required blood type
        List<User> eligibleDonors = userRepository.findEligibleDonors(requiredBloodType, LocalDate.now().minusMonths(1));

        for (User donor : eligibleDonors) {
            String subject = "Urgent: Blood Donation Request";
            String body = "Dear " + donor.getName() + ",\n\n" +
                          "A hospital (" + hospital.getName() + ") is urgently requesting blood donations for " +
                          requiredBloodType + ". Your help could save lives!\n\n" +
                          "If you are willing to donate, please visit the blood bank or reply to this email.\n\n" +
                          "Thank you,\nBlood Bank Management Team";

            emailService.sendEmail(donor.getEmail(), subject, body);
        }
    }


    @Override
    public void rejectBloodRequest(Long requestId) {
        Optional<BloodRequest> requestOpt = bloodRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            throw new RuntimeException("Blood request not found");
        }

        BloodRequest bloodRequest = requestOpt.get();
        bloodRequest.setStatus(BloodRequestStatus.REJECTED);
        bloodRequestRepository.save(bloodRequest);
    }
}
