package com.example.demo.controllers;

import com.example.demo.Enum.UserRole;
import com.example.demo.config.JwtAuth;
import com.example.demo.dto.LoginRequest;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import com.example.demo.services.IncidentService;
import com.example.demo.models.Incident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IncidentService incidentService;

    @PostMapping("/user/signup")
    public ResponseEntity<Void> signup(@RequestBody User user) {
        user.setRole(UserRole.USER);
        userService.signUp(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        User user = userService.findByUsername(loginRequest.getUsername());
        String token = JwtAuth.generateToken(user.getUsername(), user.getRole());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/incidents")
    public ResponseEntity<Incident> reportIncident(@RequestBody Incident incident) {
        // Assuming the incident is reported by the logged-in user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        incident.setUser(user);
        return ResponseEntity.ok(incidentService.reportIncident(incident));
    }
}
