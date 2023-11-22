package com.example.demo.repository;

import com.example.demo.entity.PlannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlannerRepository extends JpaRepository<PlannerEntity, Long> {
    List<PlannerEntity> findByMemberEntity_MemberId(long memberId);

    @Query(nativeQuery = true, value = "select * from planner order by like_planner desc")
    List<PlannerEntity> getTrendingPlanner();

    @Query(nativeQuery = true, value = "select * from planner where is_default = 1")
    List<PlannerEntity> getDefaultPlanner();
}
