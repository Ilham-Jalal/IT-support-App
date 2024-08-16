package com.example.demo.controllers;

import com.example.demo.models.TechnicianIT;
import com.example.demo.models.Ticket;
import com.example.demo.models.User;
import com.example.demo.models.Utilisateur;
import com.example.demo.services.TicketService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private UserService userService;

    @PostMapping("user/{incidentId}/tickets/{equipmentId}")
    public ResponseEntity<Ticket> addTicket(@RequestBody Ticket supportTicket, @PathVariable Long incidentId, @PathVariable Long equipmentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        Ticket newTicket = ticketService.saveTicket(supportTicket, incidentId, equipmentId, user);
        return ResponseEntity.ok(newTicket);
    }

    @PutMapping("admin/tickets/{id}/assign/{userId}")
    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id, @PathVariable Long userId) {
        Ticket ticket = ticketService.assignTicket(id, userId);
        return ResponseEntity.ok(ticket);
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
    @GetMapping("admin/tickets")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }
    @PutMapping("/technician/tickets/{id}")
    public ResponseEntity<Ticket> updateTicketStatus(@PathVariable Long id,@RequestBody Ticket ticket) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, ticket.getStatus()));
    }
    @GetMapping("technician/tickets/{id}")
    public Ticket findTicketById(@PathVariable Long id){
        return ticketService.findTicketById(id);
    }


}
