package com.example.demo.repository;

import com.example.demo.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity ,Long> {

    @Query(nativeQuery = true, value = "select * from likes l where l.planner_id = :plannerId and l.member_id = :memberId")
    LikeEntity getLikeEntity(@Param("plannerId")long plannerId, @Param("memberId")String memberId);


    @Query(nativeQuery = true, value = "select * from likes l where l.member_id = :memberId")
    Optional<List<LikeEntity>> findByMemberId(@Param("memberId")String memberId);

}