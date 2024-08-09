//package com.example.demo;
//
//import com.example.demo.Enum.EquipmentStatus;
//import com.example.demo.models.Equipment;
//import com.example.demo.repository.EquipmentRepository;
//import com.example.demo.services.EquipmentService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class EquipmentServiceTest {
//
//    @Mock
//    private EquipmentRepository equipmentRepository;
//
//    @InjectMocks
//    private EquipmentService equipmentService;
//
//    private Equipment equipment1;
//    private Equipment equipment2;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//
//        equipment1 = Equipment.builder()
//                .id(1L)
//                .name("Equipment 1")
//                .description("Description 1")
//                .status(EquipmentStatus.IN_USE)
//                .build();
//
//        equipment2 = Equipment.builder()
//                .id(2L)
//                .name("Equipment 2")
//                .description("Description 2")
//                .status(EquipmentStatus.OUT_OF_SERVICE)
//                .build();
//    }
//
//    @Test
//    void addEquipment() {
//        when(equipmentRepository.save(equipment1)).thenReturn(equipment1);
//
//        Equipment savedEquipment = equipmentService.addEquipment(equipment1);
//
//        assertEquals(equipment1, savedEquipment);
//        verify(equipmentRepository, times(1)).save(equipment1);
//    }
//
//    @Test
//    void updateEquipment_() {
//        when(equipmentRepository.findById(equipment1.getId())).thenReturn(Optional.of(equipment1));
//        when(equipmentRepository.save(equipment1)).thenReturn(equipment1);
//
//        equipment1.setName("Updated Equipment 1");
//        Equipment updatedEquipment = equipmentService.updateEquipment(equipment1.getId(), equipment1);
//
//        assertEquals("Updated Equipment 1", updatedEquipment.getName());
//        verify(equipmentRepository, times(1)).findById(equipment1.getId());
//        verify(equipmentRepository, times(1)).save(equipment1);
//    }
//
//    @Test
//    void updateEquipment() {
//        when(equipmentRepository.findById(equipment1.getId())).thenReturn(Optional.empty());
//
//        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
//            equipmentService.updateEquipment(equipment1.getId(), equipment1);
//        });
//
//        assertEquals("Equipment not found with id 1", exception.getMessage());
//        verify(equipmentRepository, times(1)).findById(equipment1.getId());
//        verify(equipmentRepository, times(0)).save(equipment1);
//    }
//
//    @Test
//    void deleteEquipment() {
//        doNothing().when(equipmentRepository).deleteById(equipment1.getId());
//
//        equipmentService.deleteEquipment(equipment1.getId());
//
//        verify(equipmentRepository, times(1)).deleteById(equipment1.getId());
//    }
//
//    @Test
//    void getAllEquipments() {
//        when(equipmentRepository.findAll()).thenReturn(Arrays.asList(equipment1, equipment2));
//
//        List<Equipment> equipmentList = equipmentService.getAllEquipments();
//
//        assertEquals(2, equipmentList.size());
//        assertEquals(equipment1, equipmentList.get(0));
//        assertEquals(equipment2, equipmentList.get(1));
//        verify(equipmentRepository, times(1)).findAll();
//    }
//}
