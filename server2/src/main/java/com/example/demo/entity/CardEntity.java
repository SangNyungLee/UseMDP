package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "card")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
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

    @Column(columnDefinition = "ENUM('TODO','DOING','DONE') DEFAULT 'TODO'")
    @Enumerated(EnumType.STRING)
    private CardStatus cardStatus;

    @Column
    @CreationTimestamp
    private Timestamp createdAt;

    @Column
    @UpdateTimestamp
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "plannerId")
    private PlannerEntity plannerEntity;

    @OneToMany(mappedBy = "cardEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<ChecklistEntity> checklists;

    @Getter
    public enum CardStatus {
        TODO, DOING, DONE;
    }
}
