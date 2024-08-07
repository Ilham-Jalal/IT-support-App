package com.example.demo.controllers;

import com.example.demo.Enum.IncidentStatus;
import com.example.demo.Enum.TicketStatus;
import com.example.demo.config.JwtAuth;
import com.example.demo.dto.LoginRequest;
import com.example.demo.models.*;
import com.example.demo.services.EquipmentService;
import com.example.demo.services.IncidentService;
import com.example.demo.services.TicketService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("admin/incidents/equipment/{equipmentId}")
    public ResponseEntity<List<Incident>> getIncidentsByEquipment(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(incidentService.getIncidentsByEquipment(equipmentId));
    }

    // User Management

    @PostMapping("/user/signup")
    public ResponseEntity<Void> signup(@RequestBody Utilisateur utilisateur) {
        userService.signUp(utilisateur);
        return ResponseEntity.ok().build();
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



//    @GetMapping("/user/incidents")
//    public ResponseEntity<List<Incident>> getIncidentsByUser() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String username = auth.getName();
//        User user = userService.findByUsername(username);
//        return ResponseEntity.ok(incidentService.getIncidentsByUser(user.getId()));
//    }

    // Ticket Management

//    @PostMapping("/user/tickets")
//    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String username = auth.getName();
////        Utilisateur utilisateur = userService.findByUsername(username);
////        ticket.setUtilisateur(utilisateur);
//        return ResponseEntity.ok(ticketService.createTicket(ticket));
//    }
//
//    @PutMapping("admin/tickets/{id}")
//    public ResponseEntity<Ticket> updateTicketStatus(@PathVariable Long id, @RequestParam TicketStatus status) {
//        return ResponseEntity.ok(ticketService.updateTicketStatus(id, status));
//    }
//
//    @GetMapping("user/tickets")
//    public ResponseEntity<List<Ticket>> getTicketsByUser() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String username = auth.getName();
//        User user = userService.findByUsername(username);
//        return ResponseEntity.ok(ticketService.getTicketsByUser(user.getId()));
//    }
//
//    @PutMapping("admin/tickets/{id}/assign")
//    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id, @RequestParam Long technicianId) {
//        TechnicianIT technician = userService.findTechnicianById(technicianId);
//        return ResponseEntity.ok(ticketService.assignTicket(id, technician));
//    }
//
//    @GetMapping("technician/tickets")
//    public ResponseEntity<List<Ticket>> getTicketsByTechnician() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String username = auth.getName();
//        TechnicianIT technician = (TechnicianIT) userService.findByUsername(username);
//        return ResponseEntity.ok(ticketService.getTicketsByTechnician(technician.getId()));
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleException(Exception e) {
//        return ResponseEntity.status(500).body(e.getMessage());
//    }

    // Ticket Management

    @PostMapping("user/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Utilisateur utilisateur = (Utilisateur) userService.findByUsername(username);
        ticket.setUtilisateur(utilisateur);
        return ResponseEntity.ok(ticketService.createTicket(ticket));
    }

    @PutMapping("admin/tickets/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id, @RequestParam Long technicianId) {
        return ResponseEntity.ok(ticketService.assignTicket(id, technicianId));
    }

    @GetMapping("user/tickets")
    public ResponseEntity<List<Ticket>> getTicketsByUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Utilisateur user = (Utilisateur) userService.findByUsername(username);
        return ResponseEntity.ok(ticketService.getTicketsByUser(user.getId()));
    }


}

