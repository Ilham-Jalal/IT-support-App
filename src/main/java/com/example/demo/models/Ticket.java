package com.example.demo.models;

import com.example.demo.Enum.TicketStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Date dateCreated;
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private User technician;  // Assuming Technician is a User with TECHNICIAN role

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
}
