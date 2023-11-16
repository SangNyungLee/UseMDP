package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="planner")
public class PlannerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long plannerId;

    @Column(nullable = false)
    private String creator;

    @Column(nullable = false)
    private int likePlanner;

    @Column(nullable = false)
    private String email;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String thumbnail;

    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp createAt;


}
