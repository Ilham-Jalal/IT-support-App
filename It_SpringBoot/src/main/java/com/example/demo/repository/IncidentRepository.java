package com.example.demo.repository;

import com.example.demo.models.Equipment;
import com.example.demo.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    // Find incidents by equipment ID
//    List<Incident> findByEquipmentList_Id(Long equipmentId);
//    List<Incident> findIncidentByEquipment(Long equipmentId);
    @Query("SELECT i FROM Incident i JOIN i.equipmentList e WHERE e.id = :equipmentId")
    List<Incident> findIncidentByEquipmentId(@Param("equipmentId") Long equipmentId);

}
