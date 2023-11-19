package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Table(name="planner")
public class PlannerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long plannerId;

    @Column(nullable = false)
    private String creator;

    @Column(nullable = false)
    private String title;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int likePlanner;

    @ColumnDefault("defaultImage")
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String thumbnail;

    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp createAt;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int defaultPlanner;

    //외래키 -> 한명의 유저는 여러개의 플래너를 가질 수 있음
    @ManyToOne
    @JoinColumn(name="m_id")
    private MemberEntity memberEntity;




}
