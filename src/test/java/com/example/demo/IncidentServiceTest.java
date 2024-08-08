//package com.example.demo;
//
//import com.example.demo.Enum.IncidentStatus;
//import com.example.demo.models.Equipment;
//import com.example.demo.models.Incident;
//import com.example.demo.repository.IncidentRepository;
//import com.example.demo.services.IncidentService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.*;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class IncidentServiceTest {
//
//    @Mock
//    private IncidentRepository incidentRepository;
//
//    @InjectMocks
//    private IncidentService incidentService;
//
//    private Incident incident1;
//    private Incident incident2;
//    private Equipment equipment;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//
//        equipment = Equipment.builder()
//                .id(1L)
//                .name("Equipment 1")
//                .description("Description 1")
//                .build();
//
//        incident1 = Incident.builder()
//                .id(1L)
//                .description("Incident 1")
//                .dateDetected(new Date())
//                .status(IncidentStatus.REPORTED)
//                .equipmentList(new HashSet<>(Collections.singletonList(equipment)))
//                .build();
//
//        incident2 = Incident.builder()
//                .id(2L)
//                .description("Incident 2")
//                .dateDetected(new Date())
//                .status(IncidentStatus.REPORTED)
//                .equipmentList(new HashSet<>(Collections.singletonList(equipment)))
//                .build();
//    }
//
//    @Test
//    void reportIncident() {
//        when(incidentRepository.save(incident1)).thenReturn(incident1);
//
//        Incident reportedIncident = incidentService.reportIncident(incident1);
//
//        assertNotNull(reportedIncident.getDateDetected());
//        assertEquals(IncidentStatus.REPORTED, reportedIncident.getStatus());
//        verify(incidentRepository, times(1)).save(incident1);
//    }
//
//    @Test
//    void updateIncident() {
//        when(incidentRepository.findById(incident1.getId())).thenReturn(Optional.of(incident1));
//        when(incidentRepository.save(incident1)).thenReturn(incident1);
//
//        Incident updatedIncident = incidentService.updateIncidentStatus(incident1.getId(), IncidentStatus.IN_PROGRESS);
//
//        assertEquals(IncidentStatus.IN_PROGRESS, updatedIncident.getStatus());
//        verify(incidentRepository, times(1)).findById(incident1.getId());
//        verify(incidentRepository, times(1)).save(incident1);
//    }
//
//    @Test
//    void updateIncidentStatus() {
//        when(incidentRepository.findById(incident1.getId())).thenReturn(Optional.empty());
//
//        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
//            incidentService.updateIncidentStatus(incident1.getId(), IncidentStatus.IN_PROGRESS);
//        });
//
//        assertEquals("No value present", exception.getMessage());
//        verify(incidentRepository, times(1)).findById(incident1.getId());
//        verify(incidentRepository, times(0)).save(incident1);
//    }
//
//    @Test
//    void getIncidentsByEquipment() {
//        when(incidentRepository.findIncidentByEquipmentId(equipment.getId())).thenReturn(Arrays.asList(incident1, incident2));
//
//        List<Incident> incidents = incidentService.getIncidentsByEquipment(equipment.getId());
//
//        assertEquals(2, incidents.size());
//        assertEquals(incident1, incidents.get(0));
//        assertEquals(incident2, incidents.get(1));
//        verify(incidentRepository, times(1)).findIncidentByEquipmentId(equipment.getId());
//    }
//
//    @Test
//    void deleteIncident() {
//        doNothing().when(incidentRepository).deleteById(incident1.getId());
//
//        incidentService.deleteIncident(incident1.getId());
//
//        verify(incidentRepository, times(1)).deleteById(incident1.getId());
//    }
//}
