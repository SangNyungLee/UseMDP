package com.example.demo.repository;

import com.example.demo.entity.CheckListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListRepository extends JpaRepository<CheckListEntity,Long> {
}
