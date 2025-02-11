package com.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.entity.Role;
import com.project.entity.User;
import com.project.repository.UserRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendEmail(String to, String subject, String body) {
        // Fetch any available admin from the users table
        Optional<User> adminOpt = userRepository.findFirstByRole(Role.ADMIN);
        if (adminOpt.isEmpty()) {
            throw new RuntimeException("No admin found to send email.");
        }

        String adminEmail = adminOpt.get().getEmail();
        System.out.println("generated values : " + adminEmail + to + subject);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(adminEmail); // Set sender dynamically
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
