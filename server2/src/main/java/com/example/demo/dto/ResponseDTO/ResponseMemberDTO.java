package com.example.demo.dto.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseMemberDTO {
    private String socialId;
    private String socialNickname;
    private String socialProfilePicture;
}
