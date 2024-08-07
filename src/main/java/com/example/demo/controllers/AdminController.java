//package com.example.demo.controllers;
//
//import com.example.demo.Enum.IncidentStatus;
//import com.example.demo.models.AdminIT;
//import com.example.demo.models.Equipment;
//import com.example.demo.models.Incident;
//import com.example.demo.models.User;
//import com.example.demo.services.EquipmentService;
//import com.example.demo.services.IncidentService;
//import com.example.demo.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class AdminController {
//
//    @Autowired
//    private EquipmentService equipmentService;
//
//    @Autowired
//    private IncidentService incidentService;
//
//    @Autowired
//    private UserService userService;
//
//
//    @PostMapping("/equipments")
//    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
//        return ResponseEntity.ok(equipmentService.addEquipment(equipment));
//    }
//
//    @PutMapping("/equipments/{id}")
//    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
//        return ResponseEntity.ok(equipmentService.updateEquipment(id, updatedEquipment));
//    }
//
//    @DeleteMapping("/equipments/{id}")
//    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
//        equipmentService.deleteEquipment(id);
//        return ResponseEntity.noContent().build();
//    }
//
//    @GetMapping("/equipments")
//    public ResponseEntity<List<Equipment>> getAllEquipments() {
//        return ResponseEntity.ok(equipmentService.getAllEquipments());
//    }
//
//    // Incident Management
//
//    @PutMapping("equipments/incidents/{id}")
//    public ResponseEntity<Incident> updateIncidentStatus(@PathVariable Long id, @RequestParam("status") IncidentStatus status) {
//        return ResponseEntity.ok(incidentService.updateIncidentStatus(id, status));
//    }
//
//    @GetMapping("equipments/incidents/equipment/{equipmentId}")
//    public ResponseEntity<List<Incident>> getIncidentsByEquipment(@PathVariable Long equipmentId) {
//        return ResponseEntity.ok(incidentService.getIncidentsByEquipment(equipmentId));
//    }
//}
