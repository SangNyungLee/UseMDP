package com.example.demo.dto.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseLikeDTO {
    private Long like_id;
    private Long plannerId;
    private String memberId;
}
