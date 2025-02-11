package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.LoginDTO;
import com.project.dto.LoginResponseDTO;
import com.project.dto.RegisterDTO;
import com.project.entity.Role;
import com.project.entity.User;
import com.project.security.CustomUserDetails;
import com.project.security.JwtUtils;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class UserController {

	// @Autowired
	private UserService userService;

//	    @Autowired
	private AuthenticationManager authMgr;

//	    @Autowired
	private JwtUtils jwtUtils;

	private final PasswordEncoder passwordEncoder;

	// Constructor Injection
//	    public UserController(UserService userService, AuthenticationManager authMgr, JwtUtil jwtUtils, PasswordEncoder passwordEncoder) {
//	        this.userService = userService;
//	        this.authMgr = authMgr;
//	        this.jwtUtils = jwtUtils;
//	        this.passwordEncoder = passwordEncoder;
//	    }

	// Single Register Endpoint (For all roles: Admin, Donor, Hospital)
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody @Valid RegisterDTO registrationDTO) {
		return ResponseEntity.ok(userService.registerUser(registrationDTO));
	}

	// Login Endpoint (Authenticate and generate JWT token)
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDTO request) {

//        System.out.println("Received login request: " + loginDTO.getEmail() + ", " + loginDTO.getPassword()); // Debugging line
//
//        // Manually verify user and password before proceeding with JWT token generation
//        User user = userService.getUserByEmail(loginDTO.getEmail());
//        if (user == null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//
//        // 1. Create token for authentication (email + password)
//        UsernamePasswordAuthenticationToken token = 
//                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
//
//        // 2. Authenticate using the AuthenticationManager
//        Authentication authenticatedUser = authMgr.authenticate(token);
//
//        // 3. If authentication is successful, generate JWT token
//        String jwtToken = jwtUtils.generateJwtToken(authenticatedUser);
//
		// 1. create a token(implementation of Authentication i/f)
		// to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		// 2. invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
		// => authentication successful !
		// 3. In case of successful auth, create JWT
		String jwt = jwtUtils.generateJwtToken(verifiedToken);

		// 4. Retrieve logged-in user from the verified auth token
		CustomUserDetails userDetails = (CustomUserDetails) verifiedToken.getPrincipal();
		User user = userDetails.getUser();
		
		LoginResponseDTO responseDTO=new LoginResponseDTO(
                user.getId(),
                user.getName(),
                user.getRole(),
                user.getBloodType(),  
                jwt
        );
		if(responseDTO.getRole()!=Role.DONOR)
			responseDTO.setBloodType(null);      

		// Return response with JWT token
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
	}

	// Get all users (Only Admin can do this)
	@GetMapping("/")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

	// Get user by ID (For Admin to manage a specific user)
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		return userService.getUserById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Delete user (Only Admin can delete users)
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}
