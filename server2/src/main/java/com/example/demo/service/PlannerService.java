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

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.temporal.ChronoUnit;
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
    private LikeRepository likeRepository;

    @Autowired
    private DTOConversionUtil dtoConversionUtil;

    //모든 플래너 가져오기
    public List<ResponsePlannerDTO> getAllPublicPlanners() {
        List<PlannerEntity> publicPlannerEntities = plannerRepository.findByPlannerAccess(PlannerEntity.PlannerAccess.PUBLIC);
        List<ResponsePlannerDTO> responsePlannerDTOS = new ArrayList<>();

        for (PlannerEntity publicPlannerEntity: publicPlannerEntities) {
            Set<TagEntity> tagEntities = publicPlannerEntity.getTaglist();
            List<String> taglist = tagEntities.stream().map(TagEntity::getTitle).toList();

            ResponsePlannerDTO responsePlannerDTO = ResponsePlannerDTO.builder()
                    .plannerId(publicPlannerEntity.getPlannerId())
                    .creator(publicPlannerEntity.getCreator())
                    .title(publicPlannerEntity.getTitle())
                    .likePlanner(publicPlannerEntity.getLikePlanner())
                    .thumbnail(publicPlannerEntity.getThumbnail())
                    .plannerAccess(publicPlannerEntity.getPlannerAccess())
                    .isDefault(publicPlannerEntity.getIsDefault())
                    .createdAt(publicPlannerEntity.getCreatedAt())
                    .updatedAt(publicPlannerEntity.getUpdatedAt())
                    .taglist(taglist)
                    .build();
            responsePlannerDTOS.add(responsePlannerDTO);
        }
        return responsePlannerDTOS;
    }

    //인기순으로 정렬된 플래너 가져오기
    public List<ResponsePlannerDTO> getTrendingPlanner(String memberId) {
        if(memberId == null) {
            List<PlannerEntity> publicPlannerEntitiesOrderedByLikePlannerDESC = plannerRepository.findByPlannerAccessOrderByLikePlannerDesc(PlannerEntity.PlannerAccess.PUBLIC);
            List<ResponsePlannerDTO> responsePlannerDTOS = new ArrayList<>();

            for (PlannerEntity plannerEntity: publicPlannerEntitiesOrderedByLikePlannerDESC) {
                Set<TagEntity> tagEntities = plannerEntity.getTaglist();
                List<String> taglist = tagEntities.stream().map(TagEntity::getTitle).toList();

                ResponsePlannerDTO responsePlannerDTO = ResponsePlannerDTO.builder()
                        .plannerId(plannerEntity.getPlannerId())
                        .creator(plannerEntity.getCreator())
                        .title(plannerEntity.getTitle())
                        .likePlanner(plannerEntity.getLikePlanner())
                        .thumbnail(plannerEntity.getThumbnail())
                        .plannerAccess(plannerEntity.getPlannerAccess())
                        .isDefault(plannerEntity.getIsDefault())
                        .createdAt(plannerEntity.getCreatedAt())
                        .updatedAt(plannerEntity.getUpdatedAt())
                        .taglist(taglist)
                        .build();
                responsePlannerDTOS.add(responsePlannerDTO);
            }
            return responsePlannerDTOS;
        } else {
            List<PlannerEntity> publicPlannerEntitiesExceptMineOrderedByLikePlannerDESC = plannerRepository.findByPlannerAccessAndMemberEntityMemberIdNotOrderByLikePlannerDesc(PlannerEntity.PlannerAccess.PUBLIC, memberId);
            List<ResponsePlannerDTO> responsePlannerDTOS = new ArrayList<>();

            for (PlannerEntity plannerEntity: publicPlannerEntitiesExceptMineOrderedByLikePlannerDESC) {
                Set<TagEntity> tagEntities = plannerEntity.getTaglist();
                List<String> taglist = tagEntities.stream().map(TagEntity::getTitle).toList();

                ResponsePlannerDTO responsePlannerDTO = ResponsePlannerDTO.builder()
                        .plannerId(plannerEntity.getPlannerId())
                        .creator(plannerEntity.getCreator())
                        .title(plannerEntity.getTitle())
                        .likePlanner(plannerEntity.getLikePlanner())
                        .thumbnail(plannerEntity.getThumbnail())
                        .plannerAccess(plannerEntity.getPlannerAccess())
                        .isDefault(plannerEntity.getIsDefault())
                        .createdAt(plannerEntity.getCreatedAt())
                        .updatedAt(plannerEntity.getUpdatedAt())
                        .taglist(taglist)
                        .build();
                responsePlannerDTOS.add(responsePlannerDTO);
            }
            return responsePlannerDTOS;
        }
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
                .creator(memberEntity.getSocialNickname())
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

        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();

        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestPostPlannerCopyDTO.getPlannerId());
        if(optionalPlannerEntity.isEmpty()) {
            return 0;
        }
        PlannerEntity plannerEntity = optionalPlannerEntity.get();
        Set<TagEntity> tagEntities = plannerEntity.getTaglist();
        Set<TagEntity> copiedTagEntities = new HashSet<>();
        List<CardEntity> cardEntities = plannerEntity.getCards();
        List<CardEntity> copiedCardEntities = new ArrayList<>();

        for(TagEntity tagEntity : tagEntities) {
            TagEntity copiedTagEntity = TagEntity.builder()
                    .tagId(tagEntity.getTagId())
                    .title(tagEntity.getTitle())
                    .build();
            copiedTagEntities.add(copiedTagEntity);
        }

        PlannerEntity copiedPlannerEntity = PlannerEntity.builder()
                .creator(memberEntity.getSocialNickname())
                .title(plannerEntity.getTitle())
                .thumbnail(plannerEntity.getThumbnail())
                .taglist(copiedTagEntities)
                .memberEntity(memberEntity)
                .build();

        copiedPlannerEntity = plannerRepository.save(copiedPlannerEntity);

        //현재 시간을 timestamp 타입으로 설정
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        //현재 시간 - 복사할 플래너가 생성된 시간 (밀리초 값으로 변환 후 계산)
        long currentTime = timestamp.getTime();
        long plannerTime = plannerEntity.getCreatedAt().getTime();

        long calTime = currentTime - plannerTime;


        for (CardEntity cardEntity : cardEntities) {
            //위에서 구한 차이를 이용하여 카드의 startDate와 endDate를 구한 후 반영한다
            long startDate = cardEntity.getStartDate().getTime();
            long endDate = cardEntity.getEndDate().getTime();

            Date resultStartDate = addDateAndTimestamp(startDate, calTime);
            Date resultEndDate = addDateAndTimestamp(endDate, calTime);

            CardEntity copiedCardEntity = CardEntity.builder()
                    .title(cardEntity.getTitle())
                    .coverColor(cardEntity.getCoverColor())
                    .post(cardEntity.getPost())
                    .intOrder(cardEntity.getIntOrder())
                    .cardStatus(cardEntity.getCardStatus())
                    .startDate(resultStartDate)
                    .endDate(resultEndDate)
                    .plannerEntity(copiedPlannerEntity)
                    .build();
            copiedCardEntity = cardRepository.save(copiedCardEntity);

            List<ChecklistEntity> checklistEntities = cardEntity.getChecklists();
            List<ChecklistEntity> copiedChecklistEntities = new ArrayList<>();

            for (ChecklistEntity checklistEntity : checklistEntities) {
                ChecklistEntity copiedChecklistEntity = ChecklistEntity.builder()
                        .title(checklistEntity.getTitle())
                        .cardEntity(copiedCardEntity)
                        .build();
            checklistRepository.save(copiedChecklistEntity);
            }
        }
        return copiedPlannerEntity.getPlannerId();

    }

    //날짜 더하기
    private static Date addDateAndTimestamp(long resultDate, long calTime) {
        // 두 값을 더하고 새로운 Date 객체 생성
        return new Date(resultDate + calTime);
    }

    //성공 -> 1, 실패 -> 0
    public long likePlanner(long plannerId, String memberId) {
        //좋아요 하기 전 이미 좋아요를 한 상태인지 검사
        Optional<LikeEntity> optionalLikeEntity = likeRepository.getLike(plannerId,memberId);

        //isPresent()가 참이면 이미 좋아요를 한 상태 -> 또 db에 추가하면 안됨(return 0)
        if(optionalLikeEntity.isPresent()){
            return 0;
        }else{
            LikeEntity likeEntity = LikeEntity.builder()
                    .plannerEntity(PlannerEntity.builder().plannerId(plannerId).build())
                    .memberEntity(MemberEntity.builder().memberId(memberId).build())
                    .build();
            likeRepository.save(likeEntity);

            Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.getPlanner(plannerId);
            if(optionalPlannerEntity.isPresent()){
                PlannerEntity planner = optionalPlannerEntity.get();
                PlannerEntity updatePlanner = PlannerEntity.builder()
                        .plannerId(planner.getPlannerId())
                        .creator(planner.getCreator())
                        .title(planner.getTitle())
                        .thumbnail(planner.getThumbnail())
                        .plannerAccess(planner.getPlannerAccess())
                        .likePlanner(planner.getLikePlanner()+1)
                        .isDefault(planner.getIsDefault())
                        .memberEntity(planner.getMemberEntity())
                        .createdAt(planner.getCreatedAt())
                        .build();
                plannerRepository.save(updatePlanner);
            }

            return 1;
        }

    }

    //성공 -> 1, 실패 -> 0
    public long unlikePlanner(PlannerIdDTO plannerIdDTO, String memberId) {
        LikeEntity result = likeRepository.getLikeEntity(plannerIdDTO.getPlannerId(),memberId);
        likeRepository.delete(result);

        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.getPlanner(plannerIdDTO.getPlannerId());
        if(optionalPlannerEntity.isPresent()){
            PlannerEntity planner = optionalPlannerEntity.get();
            PlannerEntity updatePlanner = PlannerEntity.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .thumbnail(planner.getThumbnail())
                    .plannerAccess(planner.getPlannerAccess())
                    .likePlanner(planner.getLikePlanner()-1)
                    .isDefault(planner.getIsDefault())
                    .memberEntity(planner.getMemberEntity())
                    .createdAt(planner.getCreatedAt())
                    .build();
            plannerRepository.save(updatePlanner);
        }

        return 1;
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