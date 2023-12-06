package com.example.demo.service;

import com.example.demo.dto.ResponseDTO.ResponseLikeDTO;
import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.LikeRepository;
import com.example.demo.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<Long> getPlanner(String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        MemberEntity memberEntity = optionalMemberEntity.orElseThrow(() -> new EntityNotFoundException("MemberEntity not found for memberId: " + memberId));
        Optional<List<LikeEntity>> optionalLikeEntities = likeRepository.findByMemberId(memberEntity.getMemberId());
        if(optionalLikeEntities.isEmpty()) {
            return new ArrayList<>();
        }
        List<LikeEntity> likeEntities = optionalLikeEntities.get();
        System.out.println(("NOTEMPTY"));
        List<Long> plannerIdList = new ArrayList<>();
        for(LikeEntity likeEntity : likeEntities) {
            plannerIdList.add(likeEntity.getPlannerId());
        }
        return plannerIdList;
    }
}