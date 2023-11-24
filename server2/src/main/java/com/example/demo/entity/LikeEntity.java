package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "likes")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long like_id;

    @ManyToOne
    @JoinColumn(name = "plannerId")
    private PlannerEntity plannerEntity;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private MemberEntity memberEntity;

    // PlannerEntity의 plannerId 반환
    public Long getPlannerId() {
        return plannerEntity != null ? plannerEntity.getPlannerId() : null;
    }

    // MemberEntity의 memberId 반환
    public String getMemberId() {
        return memberEntity != null ? memberEntity.getMemberId() : null;
    }
}
