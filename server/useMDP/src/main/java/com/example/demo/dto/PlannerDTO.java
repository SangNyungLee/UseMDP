package com.example.demo.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


@Getter
@Builder
public class PlannerDTO {
    private long plannerId;
    private String creator;
    private String title;
    private int likePlanner;
    private String thumbnail;
    private Timestamp createAt;

    private List<CardDTO> cardList;

}
