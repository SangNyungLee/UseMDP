package com.example.demo.repository;

import com.example.demo.entity.ChecklistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<ChecklistEntity, Long> {
}
