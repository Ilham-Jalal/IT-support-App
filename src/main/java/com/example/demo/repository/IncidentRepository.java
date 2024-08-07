package com.example.demo.repository;

import com.example.demo.models.Equipment;
import com.example.demo.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    // Find incidents by equipment ID
    List<Incident> findByEquipmentList_Id(Long equipmentId);

    // Other methods List<Incident> findByUserId(Long userId);

}
