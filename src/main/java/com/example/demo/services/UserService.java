package com.example.demo.services;

import com.example.demo.Enum.Role;
import com.example.demo.dto.SignUpRequest;
import com.example.demo.models.AdminIT;
import com.example.demo.models.TechnicianIT;
import com.example.demo.models.User;
import com.example.demo.models.Utilisateur;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User signUp(Role role, SignUpRequest signUpRequest) {
        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());

        User user;
        switch (role) {
            case ADMIN:
                user = new AdminIT();
                user.setRole(Role.ADMIN);
                break;
            case USER:
                user = new Utilisateur();
                user.setRole(Role.USER);
                break;
            case TECHNICIAN:
                user = new TechnicianIT();
                user.setRole(Role.TECHNICIAN);
                break;
            default:
                throw new IllegalArgumentException("Invalid user type");
        }

        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

}
