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
@DiscriminatorValue("USER")
public class Utilisateur extends User {
    @OneToMany(mappedBy = "utilisateur")
    private List<Ticket> ticketList;
}
