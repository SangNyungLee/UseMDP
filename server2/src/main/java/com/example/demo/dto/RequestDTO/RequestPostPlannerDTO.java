package com.example.demo.dto.RequestDTO;

import com.example.demo.entity.PlannerEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestPostPlannerDTO {
    private String creator;
    private String title;
    private String thumbnail;
    private PlannerEntity.PlannerAccess plannerAccess;
}
