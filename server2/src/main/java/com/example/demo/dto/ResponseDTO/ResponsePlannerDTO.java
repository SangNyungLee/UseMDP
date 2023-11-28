package com.example.demo.dto.ResponseDTO;

import com.example.demo.entity.PlannerEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class ResponsePlannerDTO {
    private long plannerId;
    private String creator;
    private String title;
    private int likePlanner;
    private String thumbnail;
    private PlannerEntity.PlannerAccess plannerAccess;
    private int isDefault;
    private Date createdAt;
    private Date updatedAt;
    private List<String> taglist;
    private List<ResponseCardDTO> cards;
    private List<ResponseLikeDTO> likes;
}
