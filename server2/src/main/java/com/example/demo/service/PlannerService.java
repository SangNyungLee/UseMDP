package com.example.demo.service;

import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.RequestDTO.*;
import com.example.demo.dto.ResponseDTO.ResponseCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseChecklistDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.utils.DTOConversionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.*;

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
    private TagRepository tagRepository;

    @Autowired
    private DTOConversionUtil dtoConversionUtil;

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

    //특정 플래너 가져오기
    public ResponsePlannerDTO getPlanner(Long plannerId) {
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(plannerId);
        if(optionalPlannerEntity.isEmpty()) {
            return null;
        }
        PlannerEntity plannerEntity = optionalPlannerEntity.get();

        List<CardEntity> cardEntities = plannerEntity.getCards();

        List<ResponseCardDTO> responseCardDTOS = cardEntities.stream().map(cardEntity -> dtoConversionUtil.toResponseCardDTO(cardEntity)).toList();

        List<String> taglist = plannerEntity.getTaglist().stream().map(TagEntity::getTitle).toList();

        return ResponsePlannerDTO.builder()
                .plannerId(plannerEntity.getPlannerId())
                .creator(plannerEntity.getCreator())
                .title(plannerEntity.getTitle())
                .likePlanner(plannerEntity.getLikePlanner())
                .thumbnail(plannerEntity.getThumbnail())
                .plannerAccess(plannerEntity.getPlannerAccess())
                .isDefault(plannerEntity.getIsDefault())
                .createdAt(plannerEntity.getCreatedAt())
                .updatedAt(plannerEntity.getUpdatedAt())
                .cards(responseCardDTOS)
                .taglist(taglist)
                .build();
    }

    //플래너 생성
    //-1값이 리턴되면 실패한 것
    public long postPlanner(RequestPostPlannerDTO requestPostPlannerDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isPresent()){
            MemberEntity member = optionalMemberEntity.get();
            PlannerEntity plannerEntity = PlannerEntity.builder()
                    .creator(member.getSocialNickname())
                    .title(requestPostPlannerDTO.getTitle())
                    .thumbnail(requestPostPlannerDTO.getThumbnail())
                    .plannerAccess(requestPostPlannerDTO.getPlannerAccess())
                    .memberEntity(member)
                    .build();
            try {
                PlannerEntity savedPlannerEntity = plannerRepository.save(plannerEntity);
                return savedPlannerEntity.getPlannerId();
            } catch (Exception e) {
                e.printStackTrace();
                return -1;
            }
        }else {
            return -1;
        }
    }

    //플래너 수정
    //성공 -> 1, 실패 -> 0
    public long patchPlanner(RequestPatchPlannerDTO requestPatchPlannerDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestPatchPlannerDTO.getPlannerId());
        if(optionalPlannerEntity.isEmpty()) {
            return 0;
        }

        MemberEntity memberEntity = optionalMemberEntity.get();
        PlannerEntity plannerEntity = optionalPlannerEntity.get();

        PlannerEntity newPlannerEntity = PlannerEntity.builder()
                .plannerId(plannerEntity.getPlannerId())
                .creator(requestPatchPlannerDTO.getCreator())
                .title(requestPatchPlannerDTO.getTitle())
                .thumbnail(requestPatchPlannerDTO.getThumbnail())
                .plannerAccess(requestPatchPlannerDTO.getPlannerAccess())
                .createdAt(plannerEntity.getCreatedAt())
                .memberEntity(memberEntity)
                .build();
        try {
            plannerEntity = plannerRepository.save(newPlannerEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
        if(!requestPatchPlannerDTO.getTaglist().isEmpty()) {
            for (String tag : requestPatchPlannerDTO.getTaglist()) {
                Optional<TagEntity> optionalTagEntity = tagRepository.findByTitle(tag);
                TagEntity tagEntity = optionalTagEntity.orElseGet(() -> {
                    TagEntity newTag = TagEntity.builder()
                            .title(tag)
                            .thumbnail("DEFAULT")
                            .build();
                    return tagRepository.save(newTag);
                });
                plannerEntity.getTaglist().add(tagEntity);
            }
        }
        try {
            plannerRepository.save(plannerEntity);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 플래너 삭제
    public int deletePlanner(long plannerId, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(plannerId);
        if(optionalPlannerEntity.isEmpty()) {
            return 0;
        }
        PlannerEntity plannerEntity = optionalPlannerEntity.get();
        try {
            plannerRepository.delete(plannerEntity);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
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
                List<String> taglist = plannerEntity.getTaglist().stream().map(TagEntity::getTitle).toList();

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
                        .taglist(taglist)
                        .build();
                plannerDTOS.add(plannerDTO);
            }
            return plannerDTOS;
        } else {
            return null;
        }
    }

    //플래너 복제하기
    public long postPlannerCopy(RequestPostPlannerCopyDTO requestPostPlannerCopyDTO, String memberId) {

        Optional<MemberEntity> member = memberRepository.findById(memberId);

        if(member.isPresent()){

            Optional<PlannerEntity> result = plannerRepository.findById(requestPostPlannerCopyDTO.getPlannerId());
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
                        .memberEntity(member.get())
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

    public int likePlanner(PlannerIdDTO plannerIdDTO) {
        long plannerId = plannerIdDTO.getPlannerId();
        return plannerRepository.likePlanner(plannerId);
    }

    public int unlikePlanner(PlannerIdDTO plannerIdDTO) {
        long plannerId = plannerIdDTO.getPlannerId();
        return plannerRepository.unlikePlanner(plannerId);
    }

    public long postJSONPlanner(RequestPostJSONPlannerDTO requestPostJSONPlannerDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        PlannerEntity plannerEntity = PlannerEntity.builder()
                .creator(requestPostJSONPlannerDTO.getCreator())
                .title(requestPostJSONPlannerDTO.getTitle())
                .thumbnail(requestPostJSONPlannerDTO.getThumbnail())
                .plannerAccess(requestPostJSONPlannerDTO.getPlannerAccess())
                .memberEntity(memberEntity)
                .build();

        PlannerEntity savedPlannerEntity;
        try {
            savedPlannerEntity = plannerRepository.save(plannerEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        if(!requestPostJSONPlannerDTO.getTaglist().isEmpty()) {
            for(String tag : requestPostJSONPlannerDTO.getTaglist()) {
                Optional<TagEntity> optionalTagEntity = tagRepository.findByTitle(tag);
                TagEntity tagEntity = optionalTagEntity.orElseGet(() -> {
                    TagEntity newTagEntity = TagEntity.builder()
                            .title(tag)
                            .thumbnail("DEFAULT")
                            .build();
                    return tagRepository.save(newTagEntity);
                });
                savedPlannerEntity.getTaglist().add(tagEntity);
            }
        }

        try {
            savedPlannerEntity = plannerRepository.save(savedPlannerEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        List<RequestPostJSONCardDTO> requestPostJSONCardDTOS = requestPostJSONPlannerDTO.getCards();

        if(!requestPostJSONCardDTOS.isEmpty()) {
            for(RequestPostJSONCardDTO requestPostJSONCardDTO : requestPostJSONCardDTOS) {
                CardEntity cardEntity = CardEntity.builder()
                        .title(requestPostJSONCardDTO.getTitle())
                        .coverColor(requestPostJSONCardDTO.getCoverColor())
                        .post(requestPostJSONCardDTO.getPost())
                        .intOrder(requestPostJSONCardDTO.getIntOrder())
                        .startDate(requestPostJSONCardDTO.getStartDate())
                        .endDate(requestPostJSONCardDTO.getEndDate())
                        .cardStatus(requestPostJSONCardDTO.getCardStatus())
                        .plannerEntity(savedPlannerEntity)
                        .build();
                CardEntity savedCardEntity = cardRepository.save(cardEntity);

                List<RequestChecklistDTO> requestChecklistDTOS = requestPostJSONCardDTO.getChecklists();
                for(RequestChecklistDTO requestChecklistDTO : requestChecklistDTOS) {
                    ChecklistEntity checklistEntity = ChecklistEntity.builder()
                            .checked(requestChecklistDTO.getChecked())
                            .title(requestChecklistDTO.getTitle())
                            .cardEntity(savedCardEntity)
                            .build();
                    checklistRepository.save(checklistEntity);
                }

            }
        }
        return savedPlannerEntity.getPlannerId();
    }

    public ResponsePlannerDTO postPlannerWithCards(RequestPostPlannerWithCardsDTO requestPostPlannerWithCardsDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if (optionalMemberEntity.isEmpty()) {
            return null;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        PlannerEntity plannerEntity = PlannerEntity.builder()
                .creator(requestPostPlannerWithCardsDTO.getCreator())
                .title(requestPostPlannerWithCardsDTO.getTitle())
                .thumbnail(requestPostPlannerWithCardsDTO.getThumbnail())
                .plannerAccess(requestPostPlannerWithCardsDTO.getPlannerAccess())
                .memberEntity(memberEntity)
                .build();

        PlannerEntity savedPlannerEntity;
        try {
            savedPlannerEntity = plannerRepository.save(plannerEntity);
            System.out.println("1");
            System.out.println("savedPlannerEntity plannerId = " + savedPlannerEntity.getPlannerId());
            System.out.println("savedPlannerEntity taglist = " + savedPlannerEntity.getTaglist().toString());
            System.out.println("savedPlannerEntity cards = " + savedPlannerEntity.getCards().toString());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("1");
            return null;
        }

        if (!requestPostPlannerWithCardsDTO.getTaglist().isEmpty()) {
            for (String tag : requestPostPlannerWithCardsDTO.getTaglist()) {
                Optional<TagEntity> optionalTagEntity = tagRepository.findByTitle(tag);
                TagEntity tagEntity = optionalTagEntity.orElseGet(() -> {
                    TagEntity newTagEntity = TagEntity.builder()
                            .title(tag)
                            .thumbnail("DEFAULT")
                            .build();
                    return tagRepository.save(newTagEntity);
                });
                savedPlannerEntity.getTaglist().add(tagEntity);
            }
        }

        try {
            savedPlannerEntity = plannerRepository.save(savedPlannerEntity);
            System.out.println("2");
            System.out.println("savedPlannerEntity plannerId = " + savedPlannerEntity.getPlannerId());
            System.out.println("savedPlannerEntity taglist = " + savedPlannerEntity.getTaglist().toString());
            System.out.println("savedPlannerEntity cards = " + savedPlannerEntity.getCards().toString());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("2");
            return null;
        }

        if (!requestPostPlannerWithCardsDTO.getCards().isEmpty()) {
            for (RequestPostCardDTO requestPostCardDTO : requestPostPlannerWithCardsDTO.getCards()) {
                CardEntity cardEntity = CardEntity.builder()
                        .title(requestPostCardDTO.getTitle())
                        .coverColor(requestPostCardDTO.getCoverColor())
                        .post(requestPostCardDTO.getPost())
                        .intOrder(requestPostCardDTO.getIntOrder())
                        .startDate(requestPostCardDTO.getStartDate())
                        .endDate(requestPostCardDTO.getEndDate())
                        .cardStatus(requestPostCardDTO.getCardStatus())
                        .plannerEntity(savedPlannerEntity)
                        .build();
                savedPlannerEntity.getCards().add(cardEntity);
            }
        }

        try {
            savedPlannerEntity = plannerRepository.save(savedPlannerEntity);
            System.out.println("3");
            System.out.println("savedPlannerEntity plannerId = " + savedPlannerEntity.getPlannerId());
            System.out.println("savedPlannerEntity taglist = " + savedPlannerEntity.getTaglist().toString());
            System.out.println("savedPlannerEntity cards = " + savedPlannerEntity.getCards().toString());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("3");
            return null;
        }

        return dtoConversionUtil.toResponsePlannerDTO(savedPlannerEntity);
    }
}