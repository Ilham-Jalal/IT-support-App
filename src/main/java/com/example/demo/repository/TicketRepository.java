package com.example.demo.repository;

import com.example.demo.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket>findByUtilisateur_Id(Long userId);
    List<Ticket> findByTechnicianId(Long technicianId);
}
