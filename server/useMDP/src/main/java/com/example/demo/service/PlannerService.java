package com.example.demo.service;

import com.example.demo.dto.ChecklistDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.responseDTO.ResponseCardDTO;
import com.example.demo.dto.responseDTO.ResponsePlannerDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlannerService {

    @Autowired
    private PlannerRepository plannerRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private MemberRepository memberRepository;

    //모든 플래너 가져오기
    public List<PlannerDTO> getPlanners() {
        List<PlannerEntity> result = plannerRepository.findAll();
        List<PlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }

    //인기순으로 정렬된 플래너 가져오기
    public List<PlannerDTO> getTrendingPlanner() {
        List<PlannerEntity> result = plannerRepository.getTrendingPlanner();
        List<PlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }

    //기본 플래너 가져오기
    public List<PlannerDTO> getDefaultPlanner() {
        List<PlannerEntity> result = plannerRepository.getDefaultPlanner();
        List<PlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }



    //플래너 생성
    //-1값이 리턴되면 실패한 것
    public long postPlanner(PlannerDTO plannerDTO, Long memberId) {
        if(memberId == null){
            return -1;
        }
        Optional<MemberEntity> member = memberRepository.findById(memberId);

        if(member.isPresent()){
            PlannerEntity plannerEntity = PlannerEntity.builder()
                    .creator(member.get().getNickname())
                    .title(plannerDTO.getTitle())
                    .likePlanner(plannerDTO.getLikePlanner())
                    .thumbnail(plannerDTO.getThumbnail())
                    .build();
            plannerRepository.save(plannerEntity);
            return plannerEntity.getPlannerId();
        }else {
            return -1;
        }

    }

    //플래너 수정
    //성공 -> 1, 실패 -> 0
    public int patchPlanner(PlannerDTO plannerDTO) {
        Optional<PlannerEntity> result = plannerRepository.findById(plannerDTO.getPlannerId());

        if(result.isPresent()){
            PlannerEntity patchPlanner = PlannerEntity.builder()
                    .plannerId(plannerDTO.getPlannerId())
                    .creator(plannerDTO.getCreator())
                    .title(plannerDTO.getTitle())
                    .likePlanner(plannerDTO.getLikePlanner())
                    .thumbnail(plannerDTO.getThumbnail())
                    .createdAt(result.get().getCreatedAt())
                    .plannerAccess(plannerDTO.getPlannerAccess())
                    .build();
            plannerRepository.save(patchPlanner);
            return 1;
        }else{
            return 0;
        }

    }

    //특정 플래너 가져오기
    public ResponsePlannerDTO getPlanner(Long decodedPlannerId) {
        Optional<PlannerEntity> result = plannerRepository.findById(decodedPlannerId);
        if(result.isPresent()) {
            PlannerEntity planner = result.get();
            System.out.println("planner.plannerId = " + planner.getPlannerId());
            System.out.println("planner.creator = " + planner.getCreator());
            System.out.println("planner.title = " + planner.getTitle());
            System.out.println("planner.likePlanner = " + planner.getLikePlanner());
            System.out.println("planner.thumbnail = " + planner.getThumbnail());
            System.out.println("planner.plannerAccess = " + planner.getPlannerAccess());
            System.out.println("planner.isDefault = " + planner.getIsDefault());
            System.out.println("planner.cards = " + planner.getCards());

            List<CardEntity> cards = planner.getCards();
            List<ResponseCardDTO> responseCardDTOList = new ArrayList<>();


            for(CardEntity card : cards) {

                List<ChecklistEntity> checklistEntityList = card.getChecklists();
                List<ChecklistDTO> checklistDTOList = new ArrayList<>();
                for(ChecklistEntity checklistEntity : checklistEntityList) {
                    ChecklistDTO checklistDTO = ChecklistDTO.builder()
                            .checked(checklistEntity.getChecked())
                            .title(checklistEntity.getTitle())
                            .build();
                    checklistDTOList.add(checklistDTO);
                }


                ResponseCardDTO responseCardDTO = ResponseCardDTO.builder()
                        .cardId(card.getCardId())
                        .cardStatus(card.getCardStatus())
                        .title(card.getTitle())
                        .coverColor(card.getCoverColor())
                        .post(card.getPost())
                        .intOrder(card.getIntOrder())
                        .startDate(card.getStartDate())
                        .endDate(card.getEndDate())
                        .checklists(checklistDTOList)
                        .build();
                responseCardDTOList.add(responseCardDTO);
            }

            ResponsePlannerDTO responsePlannerDTO = ResponsePlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .plannerAccess(planner.getPlannerAccess())
                    .isDefault(planner.getIsDefault())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .cards(responseCardDTOList)
                    .build();

            return responsePlannerDTO;
        } else {
            return null;
        }
    }

}
