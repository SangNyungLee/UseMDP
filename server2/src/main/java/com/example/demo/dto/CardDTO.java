package com.example.demo.dto;

import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {

    private String cardId;
    private long plannerId;
    private String title;
    private String coverColor;
    private String post;
    private int intOrder;
    private Date startDate;
    private Date endDate;
    private Date createdAt;
    private Date updatedAt;
    private CardEntity.CardStatus cardStatus;
    private List<ChecklistDTO> checklists;
}
