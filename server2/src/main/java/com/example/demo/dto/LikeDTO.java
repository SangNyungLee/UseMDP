package com.example.demo.dto;

import com.example.demo.entity.LikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeDTO {
    private Long like_id;
    private Long plannerId;
    private String memberId;

    public static LikeDTO fromEntity(LikeEntity likeEntity) {
        return LikeDTO.builder()
                .plannerId(likeEntity.getPlannerEntity().getPlannerId())
                .memberId(likeEntity.getMemberEntity().getMemberId())
                .build();
    }

}
