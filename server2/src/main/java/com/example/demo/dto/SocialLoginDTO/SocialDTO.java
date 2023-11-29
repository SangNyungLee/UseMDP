package com.example.demo.dto.SocialLoginDTO;

import com.example.demo.entity.MemberEntity;
import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SocialDTO {
    private MemberEntity.socialCategory socialCategory;
    private String socialId;
    private String socialNickname;
    private String socialProfilePicture;
    private String socialLoginAccessToken;
}
