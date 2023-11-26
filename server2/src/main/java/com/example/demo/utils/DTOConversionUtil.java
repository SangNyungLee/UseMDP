package com.example.demo.utils;

import com.example.demo.dto.RequestDTO.RequestChecklistDTO;
import com.example.demo.dto.RequestDTO.RequestPostCardDTO;
import com.example.demo.dto.RequestDTO.RequestPostPlannerDTO;
import com.example.demo.dto.ResponseDTO.ResponseCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseChecklistDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DTOConversionUtil {
    public ResponsePlannerDTO toResponsePlannerDTO(PlannerEntity plannerEntity) {
        List<ResponseCardDTO> responseCardDTOS = plannerEntity.getCards().stream().map(this::toResponseCardDTO).toList();
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
                .build();
    }

    public ResponseCardDTO toResponseCardDTO(CardEntity cardEntity) {
        List<ResponseChecklistDTO> responseChecklistDTOS = cardEntity.getChecklists().stream().map(this::toResponseChecklistDTO).toList();
        return ResponseCardDTO.builder()
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
                .checklists(responseChecklistDTOS)
                .build();
    }

    public ResponseChecklistDTO toResponseChecklistDTO(ChecklistEntity checklistEntity) {
        return ResponseChecklistDTO.builder()
                .checklistId(checklistEntity.getChecklistId())
                .title(checklistEntity.getTitle())
                .checked(checklistEntity.getChecked())
                .createdAt(checklistEntity.getCreatedAt())
                .updatedAt(checklistEntity.getUpdatedAt())
                .build();
    }

    public PlannerEntity toPlannerEntity(RequestPostPlannerDTO requestPostPlannerDTO) {
        return PlannerEntity.builder()
                .creator(requestPostPlannerDTO.getCreator())
                .title(requestPostPlannerDTO.getTitle())
                .thumbnail(requestPostPlannerDTO.getThumbnail())
                .plannerAccess(requestPostPlannerDTO.getPlannerAccess())
                .build();
    }

    public CardEntity toCardEntity(RequestPostCardDTO requestPostCardDTO, PlannerEntity plannerEntity) {
        return CardEntity.builder()
                .title(requestPostCardDTO.getTitle())
                .coverColor(requestPostCardDTO.getCoverColor())
                .post(requestPostCardDTO.getPost())
                .intOrder(requestPostCardDTO.getIntOrder())
                .startDate(requestPostCardDTO.getStartDate())
                .endDate(requestPostCardDTO.getEndDate())
                .cardStatus(requestPostCardDTO.getCardStatus())
                .plannerEntity(plannerEntity)
                .build();
    }

    public ChecklistEntity toChecklistEntity(RequestChecklistDTO requestChecklistDTO, CardEntity cardEntity) {
        if(requestChecklistDTO.getChecklistId() == 0) {
            return ChecklistEntity.builder()
                    .checked(requestChecklistDTO.getChecked())
                    .title(requestChecklistDTO.getTitle())
                    .cardEntity(cardEntity)
                    .build();
        }
        return ChecklistEntity.builder()
                .checklistId(requestChecklistDTO.getChecklistId())
                .checked(requestChecklistDTO.getChecked())
                .title(requestChecklistDTO.getTitle())
                .cardEntity(cardEntity)
                .build();
    }
}
