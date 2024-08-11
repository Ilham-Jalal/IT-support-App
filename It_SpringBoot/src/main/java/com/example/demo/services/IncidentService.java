package com.example.demo.services;

import com.example.demo.Enum.IncidentStatus;
import com.example.demo.models.Incident;
import com.example.demo.repository.IncidentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public Incident reportIncident(Incident incident) {
        incident.setDateDetected(new Date());
        incident.setStatus(IncidentStatus.REPORTED);
        return incidentRepository.save(incident);
    }

    public List<Incident> getAllIncidents(){
        return incidentRepository.findAll();
    }
    public Incident updateIncidentStatus(Long id, IncidentStatus status) {
        Incident incident = incidentRepository.findById(id).orElseThrow();
        incident.setStatus(status);
        return incidentRepository.save(incident);
    }
    public Incident findIncidentById(Long id) {
        return incidentRepository.findById(id).orElseThrow();
    }
    public List<Incident> getIncidentsByEquipment(Long equipmentId) {
        return incidentRepository.findIncidentByEquipmentId(equipmentId);
    }


    public void deleteIncident(Long id){incidentRepository.deleteById(id);}

}
