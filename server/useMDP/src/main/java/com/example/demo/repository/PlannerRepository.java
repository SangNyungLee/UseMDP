package com.example.demo.repository;

import com.example.demo.entity.PlannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlannerRepository extends JpaRepository<PlannerEntity,Long> {
    @Query(nativeQuery = true, value= "select * from planner")
    List<PlannerEntity> getplannerList();
}
