package com.example.demo.models;

import com.example.demo.Enum.IncidentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Date dateDetected;
    @Enumerated(EnumType.STRING)
    private IncidentStatus status;

    @ManyToMany
    @JsonIgnore
    @JsonBackReference
    @JoinTable(
            name = "incident_equipment",
            joinColumns = @JoinColumn(name = "incident_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id")
    )
    private Set<Equipment> equipmentList = new HashSet<>();

    @OneToMany(mappedBy = "incident")
    @JsonIgnore
    private List<Ticket> tickets;
}
