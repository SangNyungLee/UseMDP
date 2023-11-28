package com.example.demo.dto.ResponseDTO;

import com.example.demo.entity.TagEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTagDTO {
    private String value;
    private String label;
    private String image;
    public static ResponseTagDTO toResponseTagDTO(TagEntity tagEntity) {
        return ResponseTagDTO.builder()
                .value(tagEntity.getTitle())
                .label(tagEntity.getTitle())
                .image(tagEntity.getThumbnail())
                .build();
    }
}
