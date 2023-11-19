package com.example.demo.repository;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.entity.PlannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlannerRepository extends JpaRepository<PlannerEntity,Long> {

    //로드맵 모두 가져오기 + 인기순 로드맵
    @Query(nativeQuery = true, value="select distinct * from planner p left join member m on p.m_id = m.member_id order by like_planner desc ")
    List<PlannerEntity> findAllPlannerWithMember();

    //기본 로드맵 가져오기
    @Query(nativeQuery = true, value="select * from planner p where default_planner = 1")
    List<PlannerEntity> getPlannerListDefault();

    //내 플래너 가져오기
    @Query(nativeQuery = true, value="select distinct * from planner p left join member m on p.m_id = m.member_id where member_id = :memberId ")
    List<PlannerEntity> getMyPlanner(long memberId);

    //로드맵 삭제+수정
    @Query(nativeQuery = true, value = "select * from planner p where planner_id = :plannerId")
    PlannerEntity findByPlannerId(long plannerId);



}
