package com.example.demo.controllers;

import com.example.demo.Enum.IncidentStatus;
import com.example.demo.models.Equipment;
import com.example.demo.models.Incident;
import com.example.demo.models.User;
import com.example.demo.services.EquipmentService;
import com.example.demo.services.IncidentService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private IncidentService incidentService;

    @Autowired
    private UserService userService;

    // Equipment Management

    @PostMapping("/equipments")
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        return ResponseEntity.ok(equipmentService.addEquipment(equipment));
    }

    @PutMapping("/equipments/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        return ResponseEntity.ok(equipmentService.updateEquipment(id, updatedEquipment));
    }

    @DeleteMapping("/equipments/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/equipments")
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        return ResponseEntity.ok(equipmentService.getAllEquipments());
    }

    // Incident Management

    @PutMapping("/incidents/{id}")
    public ResponseEntity<Incident> updateIncidentStatus(@PathVariable Long id, @RequestParam("status") IncidentStatus status) {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(incidentService.updateIncidentStatus(id, status));
    }

    @GetMapping("/incidents/equipment/{equipmentId}")
    public ResponseEntity<List<Incident>> getIncidentsByEquipment(@PathVariable Long equipmentId) {
        if (!isAdmin()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        return ResponseEntity.ok(incidentService.getIncidentsByEquipment(equipmentId));
    }

    private boolean isAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        return user != null && user.getRole().toString().equals("ADMIN");
    }
}
