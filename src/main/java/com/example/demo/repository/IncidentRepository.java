package com.example.demo.repository;

import com.example.demo.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository <Incident, Long> {
}
