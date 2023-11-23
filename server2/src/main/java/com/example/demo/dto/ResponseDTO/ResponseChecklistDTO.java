package com.example.demo.dto.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseChecklistDTO {
    private long checklistId;
    private int checked;
    private String title;
    private Date createdAt;
    private Date updatedAt;
}
