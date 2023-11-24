package com.example.demo.service;

import com.example.demo.dto.ChecklistDTO;
import com.example.demo.dto.LikeDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.ResponseDTO.ResponseCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseChecklistDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private LikeRepository likeRepository;

    //모든 플래너 가져오기
    public List<ResponsePlannerDTO> getAllPlanners() {
        List<PlannerEntity> result = plannerRepository.findAll();
        List<ResponsePlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            ResponsePlannerDTO plannerDTO = ResponsePlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .plannerAccess(planner.getPlannerAccess())
                    .isDefault(planner.getIsDefault())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }

    //인기순으로 정렬된 플래너 가져오기
    public List<ResponsePlannerDTO> getTrendingPlanner() {
        List<PlannerEntity> result = plannerRepository.getTrendingPlanner();
        List<ResponsePlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            ResponsePlannerDTO plannerDTO = ResponsePlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .plannerAccess(planner.getPlannerAccess())
                    .isDefault(planner.getIsDefault())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }

    //기본 플래너 가져오기
    public List<ResponsePlannerDTO> getDefaultPlanner() {
        List<PlannerEntity> result = plannerRepository.getDefaultPlanner();
        List<ResponsePlannerDTO> plannerDTOList = new ArrayList<>();

        for(PlannerEntity planner : result){
            ResponsePlannerDTO plannerDTO = ResponsePlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .plannerAccess(planner.getPlannerAccess())
                    .isDefault(planner.getIsDefault())
                    .createdAt(planner.getCreatedAt())
                    .updatedAt(planner.getUpdatedAt())
                    .build();
            plannerDTOList.add(plannerDTO);
        }
        return plannerDTOList;
    }


//    public void postPlanner(PlannerDTO plannerDTO, long memberId) {
//        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
//
//        if(optionalMemberEntity.isPresent()) {
//            MemberEntity memberEntity = optionalMemberEntity.get();
//
//            PlannerEntity plannerEntity = PlannerEntity.builder()
//                    .creator(plannerDTO.getCreator())
//                    .title(plannerDTO.getTitle())
//                    .likePlanner(plannerDTO.getLikePlanner())
//                    .thumbnail(plannerDTO.getThumbnail())
//                    .memberEntity(memberEntity)
//                    .build();
//            plannerRepository.save(plannerEntity);
//
//        }
//    }

    //플래너 생성
    //-1값이 리턴되면 실패한 것
    public long postPlanner(PlannerDTO plannerDTO, String memberId) {
        if(memberId == null){
            return -1;
        }
        Optional<MemberEntity> member = memberRepository.findById(memberId);

        if(member.isPresent()){
            PlannerEntity plannerEntity = PlannerEntity.builder()
                    .creator(member.get().getSocialNickname())
                    .title(plannerDTO.getTitle())
                    .likePlanner(plannerDTO.getLikePlanner())
                    .thumbnail(plannerDTO.getThumbnail())
                    .memberEntity(member.get())
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
                List<ResponseChecklistDTO> checklistDTOList = new ArrayList<>();
                for(ChecklistEntity checklistEntity : checklistEntityList) {
                    ResponseChecklistDTO checklistDTO = ResponseChecklistDTO.builder()
                            .checklistId(checklistEntity.getChecklistId())
                            .checked(checklistEntity.getChecked())
                            .title(checklistEntity.getTitle())
                            .createdAt(checklistEntity.getCreatedAt())
                            .updatedAt(checklistEntity.getUpdatedAt())
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
                        .createdAt(card.getCreatedAt())
                        .updatedAt(card.getUpdatedAt())
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

    // 플래너 삭제
    public int deletePlanner(long plannerId) {
        Optional<PlannerEntity> planner = plannerRepository.findById(plannerId);
        if(planner.isEmpty()) {
            return 0;
        }
        plannerRepository.deleteById(plannerId);
        Optional<PlannerEntity> deletedPlanner = plannerRepository.findById(plannerId);
        if(deletedPlanner.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }

    // 특정 사용자의 모든 플래너 정보 가져오기
    public List<ResponsePlannerDTO> getPlannersByMember(String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);

        if (optionalMemberEntity.isPresent()) {

            List<PlannerEntity> plannerEntities = plannerRepository.findByMemberEntity_MemberId(memberId);
            List<ResponsePlannerDTO> plannerDTOS = new ArrayList<>();

            for(PlannerEntity plannerEntity : plannerEntities) {
                List<CardEntity> cardEntities = plannerEntity.getCards();
                List<ResponseCardDTO> cardDTOS = new ArrayList<>();

                for(CardEntity cardEntity : cardEntities) {
                    List<ChecklistEntity> checklistEntities = cardEntity.getChecklists();
                    List<ResponseChecklistDTO> checklistDTOS = new ArrayList<>();

                    for(ChecklistEntity checklistEntity : checklistEntities) {
                        ResponseChecklistDTO checklistDTO = ResponseChecklistDTO.builder()
                                .checklistId(checklistEntity.getChecklistId())
                                .checked(checklistEntity.getChecked())
                                .title(checklistEntity.getTitle())
                                .createdAt(checklistEntity.getCreatedAt())
                                .updatedAt(checklistEntity.getUpdatedAt())
                                .build();
                        checklistDTOS.add(checklistDTO);
                    }

                    ResponseCardDTO cardDTO = ResponseCardDTO.builder()
                            .cardId(cardEntity.getCardId())
                            .title(cardEntity.getTitle())
                            .coverColor(cardEntity.getCoverColor())
                            .post(cardEntity.getPost())
                            .intOrder(cardEntity.getIntOrder())
                            .startDate(cardEntity.getStartDate())
                            .endDate(cardEntity.getEndDate())
                            .createdAt(cardEntity.getCreatedAt())
                            .updatedAt(cardEntity.getUpdatedAt())
                            .cardStatus(cardEntity.getCardStatus())
                            .checklists(checklistDTOS)
                            .build();
                    cardDTOS.add(cardDTO);
                }

                ResponsePlannerDTO plannerDTO = ResponsePlannerDTO.builder()
                        .plannerId(plannerEntity.getPlannerId())
                        .creator(plannerEntity.getCreator())
                        .title(plannerEntity.getTitle())
                        .likePlanner(plannerEntity.getLikePlanner())
                        .thumbnail(plannerEntity.getThumbnail())
                        .createdAt(plannerEntity.getCreatedAt())
                        .updatedAt(plannerEntity.getUpdatedAt())
                        .plannerAccess(plannerEntity.getPlannerAccess())
                        .isDefault(plannerEntity.getIsDefault())
                        .cards(cardDTOS)
                        .build();
                plannerDTOS.add(plannerDTO);
            }
            return plannerDTOS;
        } else {
            return null;
        }
    }

    //플래너 복제하기
    public long postPlannerCopy(PlannerIdDTO plannerIdDTO, String decodedMemberId) {

        Optional<MemberEntity> member = memberRepository.findById(decodedMemberId);

        if(member.isPresent()){

            Optional<PlannerEntity> result = plannerRepository.findById(plannerIdDTO.getPlannerId());
            if(result.isPresent()) {
                PlannerEntity planner = result.get();

                List<CardEntity> cards = planner.getCards();
                List<ResponseCardDTO> responseCardDTOList = new ArrayList<>();

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


                //플래너 복제
                PlannerEntity copyPlannerEntity = PlannerEntity.builder()
                        .creator(member.get().getSocialNickname())
                        .title(responsePlannerDTO.getTitle())
                        .likePlanner(0)
                        .thumbnail(responsePlannerDTO.getThumbnail())
                        .isDefault(0)
                        .build();
                plannerRepository.save(copyPlannerEntity);

                for(CardEntity card : cards) {

                    List<ChecklistEntity> checklistEntityList = card.getChecklists();
                    List<ResponseChecklistDTO> checklistDTOList = new ArrayList<>();


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



                    //시작 날짜 계산 -> 복사할 카드의 날짜 변환
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


                    String DateString = dateFormat.format(responsePlannerDTO.getCreatedAt());



                    int Year = Integer.parseInt(DateString.substring(0,4));
                    int Month =  Integer.parseInt(DateString.substring(5,7));
                    int Day =  Integer.parseInt(DateString.substring(8,10));



                    //플래너의 createdAt - 현재 날짜
                    LocalDate date1 = LocalDate.of(Year, Month, Day);


                    //날짜 차이 구하기
                    Period periodStart = Period.between(date1, LocalDate.now());


                    //Period.of(년,월,일) -> 년,월,일 별로 더할 차이값 선언
                    Period periodAdd = Period.of(periodStart.getYears(), periodStart.getMonths(), periodStart.getDays());


                    //localdate 타입을 date타입으로 변환(차이값을 더해주기 위함)
                    LocalDate startLocalDate = new java.sql.Date(responseCardDTO.getStartDate().getTime()).toLocalDate();
                    LocalDate endLocalDate = new java.sql.Date(responseCardDTO.getEndDate().getTime()).toLocalDate();

                    //cardDTO의 startDate, endDate에 차이값을 더해줌
                    LocalDate startDate = startLocalDate.plus(periodAdd);
                    LocalDate endDate = endLocalDate.plus(periodAdd);

                    //localDate인 startDate와 endDate 사용을 위해 타입을 Date 타입으로 변환
                    Date startDateValue = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

                    Date endDateValue = Date.from(endDate.atStartOfDay(ZoneId.systemDefault()).toInstant());



                    //card 복사하여 레포지토리에 저장
                    CardEntity copyCard = CardEntity.builder()
                            .cardStatus(responseCardDTO.getCardStatus())
                            .title(responseCardDTO.getTitle())
                            .coverColor(responseCardDTO.getCoverColor())
                            .post(responseCardDTO.getPost())
                            .intOrder(responseCardDTO.getIntOrder())
                            .startDate(startDateValue)
                            .endDate(endDateValue)
                            .plannerEntity(copyPlannerEntity)
                            .build();

                    cardRepository.save(copyCard);

                    for(ChecklistEntity checklistEntity : checklistEntityList) {
                        ResponseChecklistDTO checklistDTO = ResponseChecklistDTO.builder()
                                .checked(checklistEntity.getChecked())
                                .title(checklistEntity.getTitle())
                                .build();
                        checklistDTOList.add(checklistDTO);

                        //체크리스트 복사하여 레포지토리에 저장
                        ChecklistEntity checklistEntityCopy = ChecklistEntity.builder()
                                .checked(0)
                                .title(checklistDTO.getTitle())
                                .cardEntity(copyCard)
                                .build();

                        checklistRepository.save(checklistEntityCopy);
                    }
                }

                return copyPlannerEntity.getPlannerId();

            }else{
                return -1;
            }
        }else {
            return -1;
        }
    }

//    public int likePlanner(PlannerIdDTO plannerIdDTO) {
//        long plannerId = plannerIdDTO.getPlannerId();
//        return plannerRepository.likePlanner(plannerId);
//    }

    //성공 -> 1, 실패 -> 0
    public int likePlanner(LikeDTO likeDTO) {

        if(likeDTO.getPlannerId() == null || likeDTO.getMemberId() == null){
            return 0;
        }

        LikeEntity likeEntity = LikeEntity.builder()
                .plannerEntity(PlannerEntity.builder().plannerId(likeDTO.getPlannerId()).build())
                .memberEntity(MemberEntity.builder().memberId(likeDTO.getMemberId()).build())
                .build();
        likeRepository.save(likeEntity);

        return 1;

    }

    //성공 -> 1, 실패 -> 0
    public int unlikePlanner(LikeDTO likeDTO) {
        if(likeDTO.getPlannerId() == null || likeDTO.getMemberId() == null){
            return 0;
        }
        long plannerId = likeDTO.getPlannerId();
        String memberId = likeDTO.getMemberId();

        LikeEntity result = likeRepository.getLikeEntity(plannerId,memberId);
        likeRepository.delete(result);
        return 1;
    }
}
