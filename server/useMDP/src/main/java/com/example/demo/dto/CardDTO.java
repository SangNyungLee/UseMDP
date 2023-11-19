package com.example.demo.dto;

import com.example.demo.entity.PlannerEntity;
import com.example.demo.entity.separatorPlan;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class CardDTO {
    private long cardId;
    private String title;
    private String coverColor;
    private String post;

    private int intOrder;

    private Date startDate;

    private Date endDate;
    private separatorPlan separatorPlan;
}
