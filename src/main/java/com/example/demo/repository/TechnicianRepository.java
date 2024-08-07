package com.example.demo.repository;

import com.example.demo.models.TechnicianIT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicianRepository extends JpaRepository<TechnicianIT, Long> {
}
