package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Utilisateur extends User {
    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnore
    private List<Ticket> ticketList;
}
