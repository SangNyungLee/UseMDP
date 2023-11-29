package com.example.demo.dto.ResponseDTO;

import com.example.demo.entity.MemberEntity;
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
    private String memberId;
    private MemberEntity.socialCategory socialCategory;
    private String socialId;
    private String socialNickname;
    private String socialProfilePicture;
}
