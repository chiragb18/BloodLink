package com.project.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.BloodRequestDTO;
import com.project.entity.BloodRequest;
import com.project.entity.BloodType;
import com.project.service.BloodRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/blood-requests")
@CrossOrigin(origins = "http://localhost:3000") 
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;
    
    // Endpoint to get list of blood types
    @GetMapping("/blood-types")
    public ResponseEntity<List<String>> getBloodTypes() {
        List<String> bloodTypes = Arrays.stream(BloodType.values())
                .map(Enum::name)  // Convert enum to string
                .collect(Collectors.toList());
        return ResponseEntity.ok(bloodTypes);
    }

    // Endpoint to create a new blood request (hospitalId now comes from the request body)
    @PostMapping("/create")
    public ResponseEntity<BloodRequest> createBloodRequest(@RequestBody @Valid BloodRequestDTO requestDTO) {
        // Use the hospitalId from the requestDTO
        return ResponseEntity.ok(bloodRequestService.createBloodRequest(requestDTO));
    }

    // Endpoint to get all blood requests (for admin)
    @GetMapping("/")
    public ResponseEntity<List<BloodRequest>> getAllBloodRequests() {
        return ResponseEntity.ok(bloodRequestService.getAllBloodRequests());
    }

    // Endpoint to approve a blood request (admin action)
    @PutMapping("/approve/{requestId}")
    public ResponseEntity<Void> approveBloodRequest(@PathVariable Long requestId) {
        bloodRequestService.approveBloodRequest(requestId);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/approve-remaining/{requestId}")
    public ResponseEntity<Void> approveRemainingBloodRequest(@PathVariable Long requestId) {
        bloodRequestService.approveRemainingBloodRequest(requestId);
        return ResponseEntity.noContent().build();
    }


    // Endpoint to reject a blood request (admin action)
    @PutMapping("/reject/{requestId}")
    public ResponseEntity<Void> rejectBloodRequest(@PathVariable Long requestId) {
        bloodRequestService.rejectBloodRequest(requestId);
        return ResponseEntity.noContent().build();
    }
}
