package com.example.demo.services;

import com.example.demo.Enum.TicketStatus;
import com.example.demo.models.*;
import com.example.demo.repository.IncidentRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final IncidentRepository incidentRepository;


    public Ticket saveTicket(Ticket ticket, Long incidentId, User user) {
        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
        ticket.setIncident(incident);
        ticket.setUtilisateur((Utilisateur) user);
        ticket.setStatus(TicketStatus.OPEN);
        return ticketRepository.save(ticket);
    }


    public Ticket updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }


    public List<Ticket> assignTicket(Long id, Long userId) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
        TechnicianIT technician = userRepository.findById(userId)
                .filter(TechnicianIT.class::isInstance)
                .map(TechnicianIT.class::cast)
                .orElseThrow(() -> new RuntimeException("Technician not found"));
        ticket.setTechnician(technician);
        return Collections.singletonList(ticketRepository.save(ticket));
    }

    public List<Ticket> getTicketsByUser(Long userId) {
        return ticketRepository.findByUtilisateur_Id(userId);
    }

    public List<Ticket> getTicketsByTechnician(Long technicianId) {
        return ticketRepository.findByTechnicianId(technicianId);
    }
}
