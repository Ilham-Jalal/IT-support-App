package com.example.demo.models;

import com.example.demo.Enum.EquipmentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private EquipmentStatus status;

    @ManyToMany(mappedBy = "equipmentList") // Corrected mappedBy
    @JsonIgnore
    private Set<Incident> incidents = new HashSet<>();

    @OneToMany(mappedBy = "equipment")
    @JsonIgnore
    private List<Ticket> ticketList;
}
