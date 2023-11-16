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
@Table(name="image")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String imageUrl;

    //외래키 -> 하나의 카드는 여러개의 이미지를 가질 수 있음
    @ManyToOne
    @JoinColumn(name="cardId")
    private CardEntity cardEntity;
}
