package com.example.demo.repository;

import com.example.demo.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository <Incident, Long> {
    List<Incident> findByEquipmentId(Long equipmentId);
}
