package com.example.demo.services;

import com.example.demo.Enum.TicketStatus;
import com.example.demo.Exeption.*;
import com.example.demo.models.*;
import com.example.demo.repository.EquipmentRepository;
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
    private final EquipmentRepository equipmentRepository;

    public Ticket findTicketById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new UserNotFoundExeption("User not found"));
    }
    public Ticket saveTicket(Ticket ticket, Long incidentId,  Long equipmentId,User user) {
        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new IncidentExeptionNotFound("not found" ));
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EquipmentExeptionNotFound("equipment not found"));
        ticket.setIncident(incident);
        ticket.setEquipment(equipment);
        ticket.setUtilisateur((Utilisateur) user);
        ticket.setStatus(TicketStatus.OPEN);
        return ticketRepository.save(ticket);
    }


    public Ticket updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }


    public Ticket assignTicket(Long ticketId, Long technicianId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketExeptionNotFound("Ticket not found"));
        TechnicianIT technician = userRepository.findById(technicianId)
                .filter(TechnicianIT.class::isInstance)
                .map(TechnicianIT.class::cast)
                .orElseThrow(() -> new TechnicianExeptionNotFound("Technician not found"));
        ticket.setTechnician(technician);
        ticket.setAssigned(true);
        return ticketRepository.save(ticket);
    }


    public List<Ticket> getTicketsByUser(Long userId) {
        return ticketRepository.findByUtilisateur_Id(userId);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    public List<Ticket> getTicketsByTechnician(Long technicianId) {
        return ticketRepository.findByTechnicianId(technicianId);
    }
}
