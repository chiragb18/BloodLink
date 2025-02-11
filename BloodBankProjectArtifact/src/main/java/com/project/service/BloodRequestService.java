package com.project.service;

import java.util.List;
import com.project.dto.BloodRequestDTO;
import com.project.entity.BloodRequest;

public interface BloodRequestService {

    BloodRequest createBloodRequest(BloodRequestDTO requestDTO);
    
    List<BloodRequest> getPendingBloodRequests();

    List<BloodRequest> getAllBloodRequests();

    void approveBloodRequest(Long requestId);

    void approveRemainingBloodRequest(Long requestId);

    void rejectBloodRequest(Long requestId);
    void sendDonationRequests(Long requestId);

}
