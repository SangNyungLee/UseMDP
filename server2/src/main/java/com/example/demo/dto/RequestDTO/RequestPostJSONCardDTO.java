package com.example.demo.dto.RequestDTO;

import com.example.demo.entity.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestPostJSONCardDTO {
    private String title;
    private String coverColor;
    private String post;
    private int intOrder;
    private Date startDate;
    private Date endDate;
    private CardEntity.CardStatus cardStatus;
    private List<RequestChecklistDTO> checklists;
}
