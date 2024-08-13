package com.example.demo.services;

import com.example.demo.Enum.Role;
import com.example.demo.Exeption.UserNotFoundExeption;
import com.example.demo.dto.SignUpRequest;
import com.example.demo.models.*;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAllUsers(){return userRepository.findAll();}
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundExeption("User not found"));
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

    public List<User> getTechnicians() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user instanceof TechnicianIT)
                .collect(Collectors.toList());
    }

    public Integer findIdUserByUsername(String username){
        return  userRepository.findIdByUsername(username);
    }
}
