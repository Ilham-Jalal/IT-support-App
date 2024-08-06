package com.example.demo.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("ADMIN")
public class AdminIT extends User {

}
