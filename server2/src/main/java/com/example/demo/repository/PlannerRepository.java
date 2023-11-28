package com.example.demo.repository;

import com.example.demo.entity.PlannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlannerRepository extends JpaRepository<PlannerEntity, Long> {
    List<PlannerEntity> findByMemberEntity_MemberId(String memberId);

    @Query(nativeQuery = true, value = "select * from planner order by like_planner desc")
    List<PlannerEntity> getTrendingPlanner();

    @Query(nativeQuery = true, value = "select * from planner where is_default = 1")
    List<PlannerEntity> getDefaultPlanner();

    @Query(value = "UPDATE PlannerEntity p SET p.likePlanner = p.likePlanner + 1 WHERE p.plannerId = :plannerId")
    int likePlanner(@Param("plannerId") long plannerId);

    @Query(value = "UPDATE PlannerEntity p SET p.likePlanner = p.likePlanner - 1 WHERE p.plannerId = :plannerId")
    int unlikePlanner(@Param("plannerId") long plannerId);

    @Query(nativeQuery = true, value = "select * from planner p where planner_id = :plannerId")
    Optional<PlannerEntity> getPlanner(@Param("plannerId")long plannerId);
}
