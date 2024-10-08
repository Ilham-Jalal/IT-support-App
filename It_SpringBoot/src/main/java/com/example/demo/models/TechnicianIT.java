package com.example.demo.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class TechnicianIT extends User {
    @Setter
    private static final String ROLE = "TECHNICIAN";

    @OneToMany(mappedBy = "technician")
    private List<Ticket> ticketList;


}
