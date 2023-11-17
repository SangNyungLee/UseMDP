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

    //처음부터 인기순으로 정렬 => 모든 로드맵 불러옴 + 인기순 로드맵 출력(인기순으로 로드맵을 출력하는 페이지가 있으므로!)
    @Query(nativeQuery = true, value= "select * from planner order by like_planner desc")
    List<PlannerEntity> getplannerList();


    //내 로드맵 가져오기
//    @Query
//    List<PlannerEntity> findByMemberId(long memberId);
}
