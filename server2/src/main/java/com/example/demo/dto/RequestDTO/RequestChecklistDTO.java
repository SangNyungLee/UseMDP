package com.example.demo.dto.RequestDTO;

import com.example.demo.entity.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestChecklistDTO {
    private long checklistId;
    private int checked;
    private String title;
}
