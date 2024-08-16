package com.example.demo.models;

import com.example.demo.Enum.TicketStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Date dateCreated;
    @Enumerated(EnumType.STRING)
    private TicketStatus status;
    @Column(nullable = false)
    private boolean isAssigned;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "technician_id")
    private User technician;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="equipment_id")
    private Equipment equipment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "incident_id")
    private Incident incident;
}
