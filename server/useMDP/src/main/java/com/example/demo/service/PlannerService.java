package com.example.demo.service;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.ChecklistDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.responseDTO.ResponseCardDTO;
import com.example.demo.dto.responseDTO.ResponsePlannerDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PlannerService {

    @Autowired
    private PlannerRepository plannerRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private CardRepository cardRepository;

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
    public long postPlanner(PlannerDTO plannerDTO, Long decodedMemberId) {

        if(decodedMemberId == null){
            return -1;
        }
        Optional<MemberEntity> member = memberRepository.findById(decodedMemberId);

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

    //플래너 복제하기
    public long postPlannerCopy(PlannerIdDTO plannerIdDTO, Long decodedMemberId) {

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
                        .creator(member.get().getNickname())
                        .title(responsePlannerDTO.getTitle())
                        .likePlanner(0)
                        .thumbnail(responsePlannerDTO.getThumbnail())
                        .isDefault(0)
                        .build();
                plannerRepository.save(copyPlannerEntity);

                for(CardEntity card : cards) {

                    List<ChecklistEntity> checklistEntityList = card.getChecklists();
                    List<ChecklistDTO> checklistDTOList = new ArrayList<>();


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
                        ChecklistDTO checklistDTO = ChecklistDTO.builder()
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
}
