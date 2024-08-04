package com.example.demo.services;

import com.example.demo.Enum.IncidentStatus;
import com.example.demo.models.Incident;
import com.example.demo.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

    public Incident reportIncident(Incident incident) {
        incident.setDateDetected(new Date());
        incident.setStatus(IncidentStatus.REPORTED);
        return incidentRepository.save(incident);
    }

    public Incident updateIncidentStatus(Long id, IncidentStatus status) {
        Incident incident = incidentRepository.findById(id).orElseThrow();
        incident.setStatus(status);
        return incidentRepository.save(incident);
    }

    public List<Incident> getIncidentsByEquipment(Long equipmentId) {
        return incidentRepository.findByEquipmentId(equipmentId);
    }
}
