package com.example.demo.services;

import com.example.demo.Enum.TicketStatus;
import com.example.demo.models.*;
import com.example.demo.repository.IncidentRepository;
import com.example.demo.repository.TechnicianRepository;
import com.example.demo.repository.TicketRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TechnicianRepository technicianRepository;
    private final IncidentRepository incidentRepository;

//    public Ticket createTicket(Ticket ticket) {
//        ticket.setDateCreated(new Date());
//        ticket.setStatus(TicketStatus.OPEN);
//        return ticketRepository.save(ticket);
//    }

    public Ticket saveTicket(Ticket ticket, Long incidentId, User user) {
        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
        ticket.setIncident(incident);
        ticket.setUtilisateur((Utilisateur) user); // Cast User to Utilisateur if necessary
//    ticket.setDateCreated(new Date());
//    ticket.setStatus(TicketStatus.OPEN);
        return ticketRepository.save(ticket);
    }


    public Ticket updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    public Ticket assignTicket(Long id, Long technicianId) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        TechnicianIT technician = technicianRepository.findById(technicianId).orElseThrow();
        ticket.setTechnician(technician);
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUser(Long userId) {
        return ticketRepository.findByUtilisateur_Id(userId);
    }

    public List<Ticket> getTicketsByTechnician(Long technicianId) {
        return ticketRepository.findByTechnicianId(technicianId);
    }
}
