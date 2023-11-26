package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "planner")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class PlannerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long plannerId;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'Creator'")
    private String creator;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'Title'")
    private String title;

    @Column(nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private int likePlanner;

    @Column(columnDefinition = "LONGTEXT", nullable = true)
    private String thumbnail;

    @Column(columnDefinition = "ENUM('PRIVATE', 'PUBLIC') DEFAULT 'PRIVATE'")
    @Enumerated(EnumType.STRING)
    private PlannerAccess plannerAccess;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private int isDefault;

    @Column
    @CreationTimestamp
    private Timestamp createdAt;

    @Column
    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "plannerEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<CardEntity> cards;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private MemberEntity memberEntity;

    @ManyToMany
    @JoinTable(
            name = "plannerTags",
            joinColumns = @JoinColumn(name = "plannerId"),
            inverseJoinColumns = @JoinColumn(name = "tagId")
    )
    private Set<TagEntity> tagEntities;

    @OneToMany(mappedBy = "plannerEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<LikeEntity> likes;

    @Getter
    public enum PlannerAccess {
        PRIVATE,
        PUBLIC
    }
}


