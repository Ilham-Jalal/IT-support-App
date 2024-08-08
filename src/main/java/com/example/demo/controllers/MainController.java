package com.example.demo.controllers;

import com.example.demo.Enum.IncidentStatus;
import com.example.demo.Enum.Role;
import com.example.demo.Enum.TicketStatus;
import com.example.demo.config.JwtAuth;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignUpRequest;
import com.example.demo.models.*;
import com.example.demo.services.EquipmentService;
import com.example.demo.services.IncidentService;
import com.example.demo.services.TicketService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainController {

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private IncidentService incidentService;

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Equipment Management

    @PostMapping("/admin")
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        return ResponseEntity.ok(equipmentService.addEquipment(equipment));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
        return ResponseEntity.ok(equipmentService.updateEquipment(id, updatedEquipment));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        return ResponseEntity.ok(equipmentService.getAllEquipments());
    }

    // Incident Management
    @PostMapping("admin/incidents")
    public ResponseEntity<Incident> reportIncident(@RequestBody Incident incident) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(incidentService.reportIncident(incident));
    }
    @DeleteMapping("/admin/incident/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/admin/incidents/{id}")
    public ResponseEntity<Incident> updateIncidentStatus(@PathVariable Long id, @RequestBody Incident incident) {
        Incident updatedIncident = incidentService.updateIncidentStatus(id, incident.getStatus());
        return ResponseEntity.ok(updatedIncident);
    }

    @GetMapping("/admin/equipment/{equipmentId}/incidents")
    public ResponseEntity<List<Incident>> getIncidentsByEquipment(@PathVariable Long equipmentId) {
        List<Incident> incidents = incidentService.getIncidentsByEquipment(equipmentId);
        return ResponseEntity.ok(incidents);
    }

    // User Management

    @PostMapping("/signup/{role}")
    public ResponseEntity<User> signUp(@PathVariable Role role, @RequestBody SignUpRequest signUpRequest) {
        User createdUser = userService.signUp(role, signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByUsername(loginRequest.getUsername());
        String token = JwtAuth.generateToken(user.getUsername(), user.getRole());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }




    @PostMapping("user/{incidentId}/tickets")
    public ResponseEntity<Ticket> addTicket(@RequestBody Ticket supportTicket, @PathVariable Long incidentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        Ticket newTicket = ticketService.saveTicket(supportTicket, incidentId, user);
        return ResponseEntity.ok(newTicket);
    }
    @PutMapping("admin/tickets/{id}/assign/{userId}")
    public ResponseEntity<List<Ticket>> assignTicket(@PathVariable Long id, @PathVariable Long userId) {
        List<Ticket> ticketList = ticketService.assignTicket(id, userId);
        return ResponseEntity.ok(ticketList);
    }

    @GetMapping("user/tickets")
    public ResponseEntity<List<Ticket>> getTicketsByUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Utilisateur user = (Utilisateur) userService.findByUsername(username);
        return ResponseEntity.ok(ticketService.getTicketsByUser(user.getId()));
    }

    @GetMapping("technician/tickets")
    public ResponseEntity<List<Ticket>> getTicketsByTechnician() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        TechnicianIT technician = (TechnicianIT) userService.findByUsername(username);
        return ResponseEntity.ok(ticketService.getTicketsByTechnician(technician.getId()));
    }

    @PutMapping("technician/tickets/{id}")
    public ResponseEntity<Ticket> updateTicketStatus(@PathVariable Long id, @RequestBody TicketStatus status) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, status));
    }
}

