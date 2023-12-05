package com.example.demo.service;

import com.example.demo.dto.ResponseDTO.ResponseTagDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.entity.TagEntity;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import com.example.demo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PlannerRepository plannerRepository;


    public List<ResponseTagDTO> getAllTags() {
        List<TagEntity> tagEntities = tagRepository.findAll();
        return tagEntities.stream()
                .map(ResponseTagDTO::toResponseTagDTO)
                .collect(Collectors.toList());
    }

    public int deleteTaglist(long plannerId, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(plannerId);
        if(optionalPlannerEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        PlannerEntity plannerEntity = optionalPlannerEntity.get();
        if(!memberEntity.getMemberId().equals(plannerEntity.getMemberEntity().getMemberId())) {
            return 0;
        }
        PlannerEntity newPlannerEntity = PlannerEntity.builder()
                .plannerId(plannerEntity.getPlannerId())
                .creator(plannerEntity.getCreator())
                .title(plannerEntity.getTitle())
                .likePlanner(plannerEntity.getLikePlanner())
                .thumbnail(plannerEntity.getThumbnail())
                .plannerAccess(plannerEntity.getPlannerAccess())
                .isDefault(plannerEntity.getIsDefault())
                .createdAt(plannerEntity.getCreatedAt())
                .cards(plannerEntity.getCards())
                .memberEntity(plannerEntity.getMemberEntity())
                .taglist(null)
                .likes(plannerEntity.getLikes())
                .build();
        plannerEntity.getTaglist().clear();
        try {
            PlannerEntity updatedPlannerEntity = plannerRepository.save(newPlannerEntity);
            System.out.println(updatedPlannerEntity.getTaglist());
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
