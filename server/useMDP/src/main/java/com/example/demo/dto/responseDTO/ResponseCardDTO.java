package com.example.demo.dto.responseDTO;

import com.example.demo.dto.ChecklistDTO;
import com.example.demo.entity.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCardDTO {
    private long cardId;
    private String title;
    private String coverColor;
    private String post;
    private int intOrder;
    private Date startDate;
    private Date endDate;
    private CardEntity.CardStatus cardStatus;
    private List<ChecklistDTO> checklists;
}
