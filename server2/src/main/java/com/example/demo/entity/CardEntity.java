package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.ArrayList;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cardId;

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

    @OneToMany(mappedBy = "cardEntity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ChecklistEntity> checklists = new ArrayList<>();

    @Getter
    public enum CardStatus {
        TODO, DOING, DONE;
    }
}
