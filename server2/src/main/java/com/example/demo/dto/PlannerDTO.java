package com.example.demo.dto;

import com.example.demo.entity.PlannerEntity;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlannerDTO {
    private long plannerId;
    private String creator;
    private String title;
    private int likePlanner;
    private String thumbnail;
    private int isDefault;
    private PlannerEntity.PlannerAccess plannerAccess;
    private List<CardDTO> cards;
    private List<LikeDTO> likes;
}
