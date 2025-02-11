package com.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.dto.LoginDTO;
import com.project.dto.RegisterDTO;
import com.project.entity.Role;
import com.project.entity.User;
import com.project.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    //  Register user (Admin, Donor, Hospital)
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterDTO registrationDTO) {
        // Ensure the role is valid
        Role role;
        try {
            role = Role.valueOf(registrationDTO.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role. Choose ADMIN, DONOR, or HOSPITAL.");
        }

        // Create a new user and set fields
        User newUser = new User();
        newUser.setName(registrationDTO.getName());
        newUser.setEmail(registrationDTO.getEmail());
        
        // Hash the password before saving
        String encodedPassword = passwordEncoder.encode(registrationDTO.getPassword());
        newUser.setPassword(encodedPassword);

        newUser.setRole(role);

        // If the role is DONOR, make bloodType mandatory
        if (role == Role.DONOR) {
            if (registrationDTO.getBloodType() == null) {
                throw new RuntimeException("Blood type is required for Donor role.");
            }
            newUser.setBloodType(registrationDTO.getBloodType());
        }

        // Save the user to the database
        return userRepository.save(newUser);
    }

    //  Login user (Role is determined dynamically)
    @Override
    public User loginUser(LoginDTO loginDTO) {
        Optional<User> userOpt = userRepository.findByEmail(loginDTO.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(loginDTO.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        return userOpt.get(); // ✅ Return the logged-in user with role
    }

    // Get all users
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Delete user
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
