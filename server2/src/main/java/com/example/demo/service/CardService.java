package com.example.demo.service;

import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.dto.RequestDTO.RequestChecklistDTO;
import com.example.demo.dto.RequestDTO.RequestPatchCardDTO;
import com.example.demo.dto.RequestDTO.RequestPostCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseChecklistDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import com.example.demo.utils.DTOConversionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardService {

    @Autowired
    private PlannerRepository plannerRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DTOConversionUtil dtoConversionUtil;

    public ResponseCardDTO getCard(String cardId, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return null;
        }

        Optional<CardEntity> optionalCardEntity = cardRepository.findById(cardId);
        if(optionalCardEntity.isEmpty()) {
            return null;
        }

        CardEntity cardEntity = optionalCardEntity.get();
        List<ChecklistEntity> checklistEntities = cardEntity.getChecklists();
        List<ResponseChecklistDTO> responseChecklistDTOS = checklistEntities.stream().map(checklistEntity -> dtoConversionUtil.toResponseChecklistDTO(checklistEntity)).toList();

        return ResponseCardDTO.builder()
                .cardId(cardEntity.getCardId())
                .title(cardEntity.getTitle())
                .coverColor(cardEntity.getCoverColor())
                .post(cardEntity.getPost())
                .intOrder(cardEntity.getIntOrder())
                .startDate(cardEntity.getStartDate())
                .endDate(cardEntity.getEndDate())
                .cardStatus(cardEntity.getCardStatus())
                .createdAt(cardEntity.getCreatedAt())
                .updatedAt(cardEntity.getUpdatedAt())
                .checklists(responseChecklistDTOS)
                .build();
    }

    public String postCard(RequestPostCardDTO requestPostCardDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return null;
        }

        MemberEntity memberEntity = optionalMemberEntity.get();
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestPostCardDTO.getPlannerId());
        if(optionalPlannerEntity.isEmpty()) {
            return null;
        }

        PlannerEntity plannerEntity = optionalPlannerEntity.get();
        CardEntity cardEntity = dtoConversionUtil.toCardEntity(requestPostCardDTO, plannerEntity);

        CardEntity savedCardEntity = cardRepository.save(cardEntity);
        List<RequestChecklistDTO> checklistDTOS = requestPostCardDTO.getChecklists();


        List<ChecklistEntity> checklistEntities = checklistDTOS.stream().map(checklistDTO -> dtoConversionUtil.toChecklistEntity(checklistDTO, savedCardEntity)).toList();

        checklistRepository.saveAll(checklistEntities);
        return savedCardEntity.getCardId();
    }

    public int patchCard(RequestPatchCardDTO requestPatchCardDTO, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestPatchCardDTO.getPlannerId());
        if(optionalPlannerEntity.isEmpty()) {
            return 0;
        }
        Optional<CardEntity> optionalCardEntity = cardRepository.findById(requestPatchCardDTO.getCardId());
        if(optionalCardEntity.isEmpty()) {
            return 0;
        }

        MemberEntity memberEntity = optionalMemberEntity.get();
        PlannerEntity plannerEntity = optionalPlannerEntity.get();
        CardEntity cardEntity = optionalCardEntity.get();
        CardEntity newCardEntity = CardEntity.builder()
                .cardId(cardEntity.getCardId())
                .title(requestPatchCardDTO.getTitle())
                .coverColor(requestPatchCardDTO.getCoverColor())
                .post(requestPatchCardDTO.getPost())
                .intOrder(requestPatchCardDTO.getIntOrder())
                .startDate(requestPatchCardDTO.getStartDate())
                .endDate(requestPatchCardDTO.getEndDate())
                .cardStatus(requestPatchCardDTO.getCardStatus())
                .createdAt(cardEntity.getCreatedAt())
                .plannerEntity(plannerEntity)
                .build();

        List<ChecklistEntity> checklistEntities  = requestPatchCardDTO.getChecklists().stream().map(requestChecklistDTO -> dtoConversionUtil.toChecklistEntity(requestChecklistDTO, cardEntity)).toList();
        cardRepository.save(newCardEntity);
        checklistRepository.saveAll(checklistEntities);
        return 1;
    }

    public int changeCardOrder(RequestChangeCardOrderDTO requestChangeCardOrderDTO, String memberId) {

        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }

        MemberEntity memberEntity = optionalMemberEntity.get();

        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestChangeCardOrderDTO.getPlannerId());
        if(optionalPlannerEntity.isPresent()) {
            PlannerEntity originalPlannerEntity = optionalPlannerEntity.get();

            Optional<CardEntity> optionalCardEntity = cardRepository.findById(requestChangeCardOrderDTO.getSourceCardId());
            if(optionalCardEntity.isPresent()) {
                CardEntity originalCardEntity = optionalCardEntity.get();

                cardRepository.handleOriginalPosition(requestChangeCardOrderDTO);
                cardRepository.handleNewPosition(requestChangeCardOrderDTO);

                CardEntity updatedCardEntity = CardEntity.builder()
                        .cardId(originalCardEntity.getCardId())
                        .title(originalCardEntity.getTitle())
                        .coverColor(originalCardEntity.getCoverColor())
                        .post(originalCardEntity.getPost())
                        .intOrder(requestChangeCardOrderDTO.getDestinationCardOrder())
                        .startDate(originalCardEntity.getStartDate())
                        .endDate(originalCardEntity.getEndDate())
                        .cardStatus(requestChangeCardOrderDTO.getDestinationCardStatus())
                        .createdAt(originalCardEntity.getCreatedAt())
                        .plannerEntity(originalPlannerEntity)
                        .build();

                cardRepository.save(updatedCardEntity);
                return 1;
            } else {
                return 0;
            }

        } else {
            return 0;
        }


    }

    public int deleteCard(String cardId, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        Optional<CardEntity> optionalCardEntity = cardRepository.findById(cardId);
        if(optionalCardEntity.isEmpty()) {
            return 0;
        }
        CardEntity cardEntity = optionalCardEntity.get();
        cardRepository.delete(cardEntity);
        Optional<CardEntity> deletedCard = cardRepository.findById(cardId);
        if(deletedCard.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }
}
