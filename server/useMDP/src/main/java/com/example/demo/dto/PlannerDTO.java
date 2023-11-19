package com.example.demo.dto;

import com.example.demo.entity.MemberEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Builder
public class PlannerDTO {
    private long plannerId;
    private String creator;
    private String title;
    private int likePlanner;
    private String thumbnail;
    private String createAt;
    private int defaultPlanner;
    private PlannerMemberDTO plannerMemberDTO;

    @Getter
    @Setter
    public static class PlannerMemberDTO {

        private long memberId;
        private String email;
        private String nickname;

        public PlannerMemberDTO(MemberEntity memberEntity) {
            this.memberId = memberEntity.getMemberId();
            this.email = memberEntity.getEmail();
            this.nickname = memberEntity.getNickname();
        }
    }

}


