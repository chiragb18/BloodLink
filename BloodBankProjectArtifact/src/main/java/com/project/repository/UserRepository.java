package com.project.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.BloodType;
import com.project.entity.Role;
import com.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	 Optional<User> findByEmail(String email);
	 Optional<User> findByEmailAndRole(String email, Role role);
    Optional<User> findById(Long id);
	Optional<User> findFirstByRole(Role ADMIN);
	
//	@Query("SELECT u FROM User u WHERE u.bloodType = :bloodType " +
//		       "AND (NOT EXISTS (SELECT d FROM BloodDonationRequest d WHERE d.donor = u " +
//		       "AND d.status = 'APPROVED' AND d.requestDate > :lastMonth) " +
//		       "OR NOT EXISTS (SELECT d FROM BloodDonationRequest d WHERE d.donor = u AND d.status = 'APPROVED'))")
//		List<User> findEligibleDonors(@Param("bloodType") BloodType bloodType, @Param("lastMonth") LocalDate lastMonth);
//

	
//	@Query("SELECT u FROM User u WHERE u.bloodType = :bloodType " +
//		       "AND (NOT EXISTS (SELECT d FROM u.bloodDonationRequests d WHERE d.status = 'APPROVED' " +
//		       "AND d.requestDate > :lastMonth))")
//		List<User> findEligibleDonors(@Param("bloodType") BloodType bloodType, @Param("lastMonth") LocalDate lastMonth);

	@Query("SELECT u FROM User u WHERE u.bloodType = :bloodType " +
		       "AND NOT EXISTS (SELECT d FROM BloodDonationRequest d WHERE d.donor = u " +
		       "AND d.status = 'APPROVED' AND d.requestDate > :lastMonth)")
		List<User> findEligibleDonors(@Param("bloodType") BloodType bloodType, @Param("lastMonth") LocalDate lastMonth);

}
