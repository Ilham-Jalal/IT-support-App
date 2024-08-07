package com.example.demo.services;

import com.example.demo.Enum.TicketStatus;
import com.example.demo.models.TechnicianIT;
import com.example.demo.models.Ticket;
import com.example.demo.repository.TechnicianRepository;
import com.example.demo.repository.TicketRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TechnicianRepository technicianRepository;

    public Ticket createTicket(Ticket ticket) {
        ticket.setDateCreated(new Date());
        ticket.setStatus(TicketStatus.OPEN);
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

  
}
