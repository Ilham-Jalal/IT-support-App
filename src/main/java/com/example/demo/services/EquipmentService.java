package com.example.demo.services;

import com.example.demo.models.Equipment;
import com.example.demo.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
        Optional<Equipment> existingEquipment = equipmentRepository.findById(id);
        if (existingEquipment.isPresent()) {
            Equipment equipment = existingEquipment.get();
            equipment.setName(updatedEquipment.getName());
            equipment.setDescription(updatedEquipment.getDescription());
            equipment.setStatus(updatedEquipment.getStatus());
            equipment.setAdmin(updatedEquipment.getAdmin());
            return equipmentRepository.save(equipment);
        }
        throw new RuntimeException("Equipment not found with id " + id);
    }

    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }

    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }
}
