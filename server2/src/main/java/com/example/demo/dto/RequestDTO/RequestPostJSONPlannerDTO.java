package com.example.demo.dto.RequestDTO;

import com.example.demo.entity.PlannerEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestPostJSONPlannerDTO {
    private String creator;
    private String title;
    private String thumbnail;
    private PlannerEntity.PlannerAccess plannerAccess;
    private List<RequestPostJSONCardDTO> cards;
}
