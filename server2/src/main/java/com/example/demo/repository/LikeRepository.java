package com.example.demo.repository;

import com.example.demo.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikeRepository extends JpaRepository<LikeEntity ,Long> {

    @Query(nativeQuery = true, value = "select * from likes l where l.planner_id = :plannerId and l.member_id = :memberId")
    LikeEntity getLikeEntity(long plannerId, String memberId);
}
