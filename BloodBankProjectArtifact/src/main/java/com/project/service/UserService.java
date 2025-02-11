package com.project.service;

import java.util.List;
import java.util.Optional;

import com.project.dto.LoginDTO;
import com.project.dto.RegisterDTO;
import com.project.entity.User;

public interface UserService {
	 User registerUser(RegisterDTO registrationDTO);  // ✅ Single register method for all roles
	    User loginUser(LoginDTO loginDTO);  // ✅ Single login method, detects role dynamically
	    List<User> getAllUsers();
	    Optional<User> getUserById(Long id);
	    void deleteUser(Long id);
	    
	    User getUserByEmail(String email);
}
