package com.project.dto;
import java.time.LocalDate;

public class DonationEligibilityResponse {

    private LocalDate donationDate;

    public DonationEligibilityResponse(LocalDate donationDate) {
        this.donationDate = donationDate;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }
}
