package com.example.demo.service;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PlannerService {
    @Autowired
    PlannerRepository plannerRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CardRepository cardRepository;
    //로드맵 리스트 모두 가져오기+해당 로드맵을 작성한 유저 정보도 가져오기
    public List<MemberDTO> getPlannerList() {

        //플래너 테이블과 조인한 멤버 테이블의 결과
        List<MemberEntity> members = memberRepository.findAll();
        List<MemberDTO> memberList = new ArrayList<>();
        List<PlannerDTO> plannerList = new ArrayList<>();


        for(MemberEntity member : members) {
            if(member.getPlannerEntityLists().size()>0){
                System.out.println(member.getPlannerEntityLists().size());
                System.out.println(member.getPlannerEntityLists().get(0).getTitle());
            }

            MemberDTO memberDTO = MemberDTO.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .build();
            memberList.add(memberDTO);
        }

        return memberList;

//        for(PlannerEntity planner : members) {
////            PlannerDTO plannerDTO = PlannerDTO.builder()
////                    .plannerId(planner.getPlannerId())
////                    .creator(planner.getCreator())
////                    .title(planner.getTitle())
////                    .likePlanner(planner.getLikePlanner())
////                    .thumbnail(planner.getThumbnail())
////                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
////                    .build();
////            list.add(plannerDTO);
////        }


        //플래너 테이블 불러오기
//        List<PlannerEntity> result = plannerRepository.getplannerList();
//        List<PlannerDTO> list = new ArrayList<>();
//
//        for(PlannerEntity planner : result) {
//            PlannerDTO plannerDTO = PlannerDTO.builder()
//                    .plannerId(planner.getPlannerId())
//                    .creator(planner.getCreator())
//                    .title(planner.getTitle())
//                    .likePlanner(planner.getLikePlanner())
//                    .thumbnail(planner.getThumbnail())
//                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
//                    .build();
//            list.add(plannerDTO);
//        }
//        Map<String,List> resultMap = new HashMap<String,List>();
//
//        resultMap.put("planner",list);
//        resultMap.put("member",memberList);

//        return resultMap;

    }

    public List<PlannerDTO> getPlannerById() {

        List<PlannerEntity> ce = plannerRepository.getPlannerEntityByPlannerId(1L);
        List<PlannerDTO> plannerDTOs = new ArrayList<>();

        for(PlannerEntity plan : ce) {
            List<CardDTO> cards =new ArrayList<>();
            if(plan.getCardEntityList().size()>0){
               List<CardEntity> cardsEntity = plan.getCardEntityList();
                System.out.println("Test DTO : "+cardsEntity.size());

                for(CardEntity card : cardsEntity){
                    CardDTO cardDTO= CardDTO.builder()
                            .title(card.getTitle())
                            .separatorPlan(card.getSeparatorPlan())
                            .cardId(card.getCardId())
                            .coverColor(card.getCoverColor())
                            .endDate(card.getEndDate())
                            .intOrder(card.getIntOrder())
                            .post(card.getPost())
                            .startDate(card.getStartDate())
                            .build();
                    cards.add(cardDTO);

                }

            }

            PlannerDTO ptdo = PlannerDTO.builder()
                    .plannerId(plan.getPlannerId())
                    .likePlanner(plan.getLikePlanner())
                    .title(plan.getTitle())
                    .creator(plan.getCreator())
                    .createAt(plan.getCreateAt())
                    .thumbnail(plan.getThumbnail())
                    .cardList(cards)
                    .build();
            plannerDTOs.add(ptdo);
        }


        return plannerDTOs;
    }

    //내 로드맵 리스트 가져오기
//    public List<PlannerDTO> getMyPlannerList(long userId) {
//        List<PlannerEntity> result = plannerRepository.findByMemberId(userId);
//        List<PlannerDTO> list = new ArrayList<>();
//
//        for(PlannerEntity planner : result) {
//            PlannerDTO plannerDTO = PlannerDTO.builder()
//                    .plannerId(planner.getPlannerId())
//                    .creator(planner.getCreator())
//                    .title(planner.getTitle())
//                    .likePlanner(planner.getLikePlanner())
//                    .thumbnail(planner.getThumbnail())
//                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
//                    .build();
//            list.add(plannerDTO);
//        }
//        return list;
//
//    }
}
