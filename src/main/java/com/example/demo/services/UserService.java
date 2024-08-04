package com.example.demo.services;

import com.example.demo.Enum.UserRole;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

//    public User signUp(User user) {
//        String hashedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(hashedPassword);
//        user.setRole(UserRole.USER);
//        return userRepository.save(user);
//    }

    public User signUp(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        if (user.getRole() == null) {
            user.setRole(UserRole.USER); 
        }
        return userRepository.save(user);
    }

}
