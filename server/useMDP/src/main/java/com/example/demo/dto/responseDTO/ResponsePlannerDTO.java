package com.example.demo.dto.responseDTO;

import com.example.demo.entity.PlannerEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
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
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<ResponseCardDTO> cards;
}
