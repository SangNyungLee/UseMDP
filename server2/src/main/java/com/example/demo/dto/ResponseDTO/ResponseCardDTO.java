package com.example.demo.dto.ResponseDTO;

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
    private String cardId;
    private String title;
    private String coverColor;
    private String post;
    private int intOrder;
    private Date startDate;
    private Date endDate;
    private CardEntity.CardStatus cardStatus;
    private Date createdAt;
    private Date updatedAt;
    private List<ResponseChecklistDTO> checklists;
    private String sourceResource;
}
