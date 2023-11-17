package com.example.demo.dto;

import lombok.Builder;
import lombok.Getter;



@Getter
@Builder
public class PlannerDTO {
    private long plannerId;
    private String creator;
    private String title;
    private int likePlanner;
    private String thumbnail;
    private String createAt;

}
