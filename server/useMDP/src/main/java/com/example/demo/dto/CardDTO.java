package com.example.demo.dto;

import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import lombok.*;
import java.util.Date;
import java.util.List;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {

    private long cardId;
    private long plannerId;
    private String title;
    private String coverColor;
    private String post;
    private int intOrder;
    private Date startDate;
    private Date endDate;
    private CardEntity.CardStatus cardStatus;
    private List<ChecklistEntity> checklists;
}
