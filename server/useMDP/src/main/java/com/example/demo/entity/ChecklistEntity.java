package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "checklist")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long checklistId;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int checked;

    @Column(nullable = false)
    private String title;

    @Column
    @CreationTimestamp
    private Timestamp createAt;

    @Column
    @UpdateTimestamp
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "cardId")
    private CardEntity cardEntity;

}
