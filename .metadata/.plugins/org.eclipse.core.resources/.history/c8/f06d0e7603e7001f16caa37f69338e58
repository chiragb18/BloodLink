package com.project.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.project.dto.BloodDonationRequestDTO;
import com.project.entity.BloodCollection;
import com.project.entity.BloodDonationRequest;
import com.project.entity.BloodInventory;
import com.project.entity.DonationStatus;
import com.project.entity.User;
import com.project.exception.ResourceNotFoundException;
import com.project.repository.BloodCollectionRepository;
import com.project.repository.BloodDonationRequestRepository;
import com.project.repository.BloodInventoryRepository;
import com.project.repository.UserRepository;

@Service
public class BloodDonationRequestServiceImpl implements BloodDonationRequestService {

    @Autowired
    private BloodDonationRequestRepository bloodDonationRequestRepository;
    @Autowired
    private BloodCollectionRepository bloodCollectionRepository;
    @Autowired
    private BloodInventoryRepository bloodInventoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<BloodDonationRequest> getAllPendingRequests() {
        return bloodDonationRequestRepository.findByStatus(DonationStatus.PENDING);
    }

    @Override
    public BloodDonationRequest approveRequest(Long requestId) {
        // Fetch the donation request
        BloodDonationRequest request = bloodDonationRequestRepository.findById(requestId)
            .orElseThrow(() -> new ResourceNotFoundException("BloodDonationRequest"));

        // Update the status of the request to 'APPROVED'
        request.setStatus(DonationStatus.APPROVED);
        bloodDonationRequestRepository.save(request);

        // Create a new BloodCollection entry
        BloodCollection bloodCollection = new BloodCollection();
        bloodCollection.setDonor(request.getDonor());  // Link to the donor
        bloodCollection.setBloodType(request.getBloodType());  // Set blood type from the request
        bloodCollection.setQuantity(request.getQuantity());  // Set the quantity from the request
        bloodCollection.setCollectionDate(LocalDate.now());  // Set the collection date as the current date
        bloodCollection.setExpiryDate(LocalDate.now().plusMonths(1));  // Set expiry date (1 month later)

        // Save the BloodCollection entry
        bloodCollectionRepository.save(bloodCollection);

        // Check if the BloodInventory for the corresponding blood type exists
        BloodInventory inventory = bloodInventoryRepository.findByBloodType(request.getBloodType())
            .orElseGet(() -> {
                // If not found, create a new BloodInventory entry for that blood type
                BloodInventory newInventory = new BloodInventory();
                newInventory.setBloodType(request.getBloodType());
                newInventory.setTotalUnits(0);  // Initialize with 0 units
                newInventory.setAvailableUnits(0);  // Initialize with 0 available units
                return newInventory;
            });

        // Update the inventory counts
        inventory.setTotalUnits(inventory.getTotalUnits() + request.getQuantity());
        inventory.setAvailableUnits(inventory.getAvailableUnits() + request.getQuantity());

        // Save the updated or newly created BloodInventory
        bloodInventoryRepository.save(inventory);

        return request;
    }

//    @Override
//    public BloodDonationRequest submitDonationRequest(BloodDonationRequestDTO requestDTO) {
//        User donor = userRepository.findById(requestDTO.getDonorId())
//                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with ID: " + requestDTO.getDonorId()));
//
//        // Calculate 1 month ago from today
//        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);
//
//        // Check if the donor has an approved request in the past month
//        boolean hasRecentApprovedRequest = bloodDonationRequestRepository.existsByDonorAndStatusAndRequestDateAfter(
//                donor, DonationStatus.APPROVED, oneMonthAgo);
//
//        if (hasRecentApprovedRequest) {
//            throw new IllegalStateException("You have already donated blood in the past month. Please wait before making another request.");
//        }
//
//        // If no recent approved request, proceed with saving a new request
//        BloodDonationRequest request = new BloodDonationRequest();
//        request.setDonor(donor);
//        request.setBloodType(requestDTO.getBloodType());
//        request.setQuantity(requestDTO.getQuantity());
//        request.setStatus(DonationStatus.PENDING);
//        request.setRequestDate(LocalDate.now());
//
//        return bloodDonationRequestRepository.save(request);
//    }
    @Override
    public BloodDonationRequest submitDonationRequest(BloodDonationRequestDTO requestDTO) {
        User donor = userRepository.findById(requestDTO.getDonorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donor not found with ID: " + requestDTO.getDonorId()));

        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);

        boolean hasRecentApprovedRequest = bloodDonationRequestRepository.existsByDonorAndStatusAndRequestDateAfter(
                donor, DonationStatus.APPROVED, oneMonthAgo);

        if (hasRecentApprovedRequest) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "You have already donated blood in the past month. Please wait before making another request.");
        }

        BloodDonationRequest request = new BloodDonationRequest();
        request.setDonor(donor);
        request.setBloodType(requestDTO.getBloodType());
        request.setQuantity(requestDTO.getQuantity());
        request.setStatus(DonationStatus.PENDING);
        request.setRequestDate(LocalDate.now());

        return bloodDonationRequestRepository.save(request);
    }


    @Override
    public Optional<BloodDonationRequest> findFirstByDonorIdAndStatusAndRequestDateAfter(
        Long donorId, 
        DonationStatus status, 
        LocalDate requestDate
    ) {
        return bloodDonationRequestRepository
            .findFirstByDonorIdAndStatusAndRequestDateAfter(donorId, status, requestDate);
    }
    @Override
    public boolean deleteRequest(Long id) {
        if (bloodDonationRequestRepository.existsById(id)) {
            bloodDonationRequestRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
