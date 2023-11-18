package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class MemberDTO {

    private long memberId;

    private String email;

    private String nickname;
}
