package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="checklist")
public class CheckListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long checkListId;

    //1이 체크됨, 0이 체크안됨
    @Column
    private int checked;

    @Column(nullable = false)
    private String title;

    //외래키 -> 하나의 카드는 여러개의 체크리스트를 가질 수 있음
    @ManyToOne
    @JoinColumn(name="cardId")
    private CardEntity cardEntity;
}
