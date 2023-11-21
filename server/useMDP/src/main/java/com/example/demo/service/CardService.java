package com.example.demo.service;

import com.example.demo.dto.CardDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private PlannerRepository plannerRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private ChecklistRepository checklistRepository;


    public void postCard(CardDTO cardDTO) {
        System.out.println("cardDTO checklists = " + cardDTO.getChecklists());
        Optional<PlannerEntity> optionalPlanner = plannerRepository.findById(cardDTO.getPlannerId());
        System.out.println("cardDTO = " + cardDTO.getPlannerId());
        if(optionalPlanner.isPresent()) {
            PlannerEntity planner = optionalPlanner.get();
            CardEntity cardEntity = CardEntity.builder()
                    .title(cardDTO.getTitle())
                    .coverColor(cardDTO.getCoverColor())
                    .post(cardDTO.getPost())
                    .intOrder(cardDTO.getIntOrder())
                    .startDate(cardDTO.getStartDate())
                    .endDate(cardDTO.getEndDate())
                    .cardStatus(cardDTO.getCardStatus())
                    .plannerEntity(planner)
                    .build();

            cardRepository.save(cardEntity);

            List<ChecklistEntity> checklistEntities = cardDTO.getChecklists();
            for(ChecklistEntity checklistEntity : checklistEntities) {

                ChecklistEntity newChecklistEntity = ChecklistEntity.builder()
                        .checked(checklistEntity.getChecked())
                        .title(checklistEntity.getTitle())
                        .cardEntity(cardEntity)
                        .build();
                checklistRepository.save(newChecklistEntity);
            }
        }
    }
}
