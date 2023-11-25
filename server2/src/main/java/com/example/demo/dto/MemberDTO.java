package com.example.demo.dto;

import com.example.demo.entity.PlannerEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private String memberId;
    private String socialId;
    private String socialNickname;
    private String socialProfilePicture;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<PlannerDTO> planners;
}
