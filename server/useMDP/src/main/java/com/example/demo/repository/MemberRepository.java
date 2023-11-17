package com.example.demo.repository;

import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
//    @Override
//    List<MemberEntity> findAll();

    //PlannerService에서 MemberEntity의 값을 불러오기 위함
    @Override
    @EntityGraph(attributePaths = {"plannerEntityLists"})
    List<MemberEntity> findAll();
}
