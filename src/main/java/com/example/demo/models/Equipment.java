package com.example.demo.models;

import com.example.demo.Enum.EquipmentStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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



    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Incident> incidents;

}
