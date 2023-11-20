package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cardId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String coverColor;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String post;

    @Column(nullable = false)
    private int intOrder;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date endDate;

    //외래키 -> 하나의 플래너는 여러개의 카드를 가질 수 있음
    @ManyToOne
    @JoinColumn(name="plannerId")
    private PlannerEntity plannerEntity;


//    @Column(columnDefinition = "ENUM('TODO','DOING','DONE')", nullable = false)
    @Enumerated(EnumType.STRING)
    private separatorPlan separatorPlan;



}
