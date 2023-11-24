package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "like")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class LikeEntity {
    @ManyToOne
    @JoinColumn(name = "plannerId")
    private PlannerEntity plannerEntity;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private MemberEntity memberEntity;
}
