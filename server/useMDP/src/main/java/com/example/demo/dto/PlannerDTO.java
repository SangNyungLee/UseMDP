package com.example.demo.dto;

import lombok.Builder;
import lombok.Getter;



@Getter
@Builder
public class PlannerDTO {
    private long plannerId;
    private String creator;
    private int likePlanner;
    private String email;
    private String thumbnail;
    private String createAt;

}
