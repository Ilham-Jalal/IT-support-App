package com.example.demo.controllers;

import com.example.demo.models.Incident;
import com.example.demo.models.User;
import com.example.demo.services.IncidentService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class IncidentController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private IncidentService incidentService;

    // Incident Management
    @GetMapping("/incidents/all")
    public List<Incident> getAllIcidents(){
        return incidentService.getAllIncidents();
    }

    @PostMapping("admin/incidents")
    public ResponseEntity<Incident> reportIncident(@RequestBody Incident incident) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        Incident createdIncident = incidentService.reportIncident(incident);
        return ResponseEntity.ok(createdIncident);
    }
    @GetMapping("admin/incidents/{id}")
    public ResponseEntity<Incident> findIncidentById(@PathVariable("id") Long id) {
        Incident incident = incidentService.findIncidentById(id);
        return new ResponseEntity<>(incident, HttpStatus.OK);}
    @DeleteMapping("/admin/incidents/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/admin/incidents/{id}")
    public ResponseEntity<Incident> updateIncidentStatus(@PathVariable Long id, @RequestBody Incident incident) {
        Incident updatedIncident = incidentService.updateIncidentStatus(id, incident.getStatus());
        return ResponseEntity.ok(updatedIncident);
    }

    @GetMapping("/admin/incidents/{equipmentId}/equipment")
    public ResponseEntity<List<Incident>> getIncidentsByEquipment(@PathVariable Long equipmentId) {
        List<Incident> incidents = incidentService.getIncidentsByEquipment(equipmentId);
        return ResponseEntity.ok(incidents);
    }}