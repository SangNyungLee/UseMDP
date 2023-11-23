package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistDTO {
    private long checklistId;
    private int checked;
    private String title;
    private long cardId;
    private Date createdAt;
    private Date updatedAt;
}
