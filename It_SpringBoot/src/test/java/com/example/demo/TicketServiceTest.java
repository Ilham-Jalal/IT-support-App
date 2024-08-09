//package com.example.demo;
//
//import com.example.demo.Enum.TicketStatus;
//import com.example.demo.models.Incident;
//import com.example.demo.models.TechnicianIT;
//import com.example.demo.models.Ticket;
//import com.example.demo.models.Utilisateur;
//import com.example.demo.repository.IncidentRepository;
//import com.example.demo.repository.TicketRepository;
//import com.example.demo.repository.UserRepository;
//import com.example.demo.services.TicketService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class TicketServiceTest {
//
//    @Mock
//    private TicketRepository ticketRepository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private IncidentRepository incidentRepository;
//
//    @InjectMocks
//    private TicketService ticketService;
//
//    private Ticket ticket;
//    private Incident incident;
//    private Utilisateur utilisateur;
//    private TechnicianIT technician;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//
//        utilisateur = new Utilisateur();
//        utilisateur.setId(1L);
//
//        technician = new TechnicianIT();
//        technician.setId(2L);
//
//        incident = new Incident();
//        incident.setId(1L);
//
//        ticket = Ticket.builder()
//                .id(1L)
//                .description("Test Ticket")
//                .dateCreated(new java.util.Date())
//                .status(TicketStatus.OPEN)
//                .utilisateur(utilisateur)
//                .incident(incident)
//                .build();
//    }
//
//    @Test
//    void saveTicket() {
//        when(incidentRepository.findById(incident.getId())).thenReturn(Optional.of(incident));
//        when(ticketRepository.save(ticket)).thenReturn(ticket);
//
//        Ticket savedTicket = ticketService.saveTicket(ticket, incident.getId(), utilisateur);
//
//        assertEquals(incident, savedTicket.getIncident());
//        assertEquals(utilisateur, savedTicket.getUtilisateur());
//        assertEquals(TicketStatus.OPEN, savedTicket.getStatus());
//        verify(ticketRepository, times(1)).save(ticket);
//    }
//
//    @Test
//    void updateTicketStatus() {
//        when(ticketRepository.findById(ticket.getId())).thenReturn(Optional.of(ticket));
//        when(ticketRepository.save(ticket)).thenReturn(ticket);
//
//        Ticket updatedTicket = ticketService.updateTicketStatus(ticket.getId(), TicketStatus.IN_PROGRESS);
//
//        assertEquals(TicketStatus.IN_PROGRESS, updatedTicket.getStatus());
//        verify(ticketRepository, times(1)).findById(ticket.getId());
//        verify(ticketRepository, times(1)).save(ticket);
//    }
//
//    @Test
//    void assignTicket() {
//        when(ticketRepository.findById(ticket.getId())).thenReturn(Optional.of(ticket));
//        when(userRepository.findById(technician.getId())).thenReturn(Optional.of(technician));
//        when(ticketRepository.save(ticket)).thenReturn(ticket);
//
//        List<Ticket> assignedTickets = ticketService.assignTicket(ticket.getId(), technician.getId());
//
//        assertEquals(technician, assignedTickets.get(0).getTechnician());
//        verify(ticketRepository, times(1)).findById(ticket.getId());
//        verify(userRepository, times(1)).findById(technician.getId());
//        verify(ticketRepository, times(1)).save(ticket);
//    }
//
//    @Test
//    void getTicketsByUser() {
//        when(ticketRepository.findByUtilisateur_Id(utilisateur.getId())).thenReturn(Collections.singletonList(ticket));
//
//        List<Ticket> tickets = ticketService.getTicketsByUser(utilisateur.getId());
//
//        assertEquals(1, tickets.size());
//        assertEquals(ticket, tickets.get(0));
//        verify(ticketRepository, times(1)).findByUtilisateur_Id(utilisateur.getId());
//    }
//
//    @Test
//    void getTicketsByTechnician() {
//        when(ticketRepository.findByTechnicianId(technician.getId())).thenReturn(Collections.singletonList(ticket));
//
//        List<Ticket> tickets = ticketService.getTicketsByTechnician(technician.getId());
//
//        assertEquals(1, tickets.size());
//        assertEquals(ticket, tickets.get(0));
//        verify(ticketRepository, times(1)).findByTechnicianId(technician.getId());
//    }
//}
