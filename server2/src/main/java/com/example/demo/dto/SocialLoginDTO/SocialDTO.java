package com.example.demo.dto.SocialLoginDTO;

import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SocialDTO {
    private String socialId;
    private String socialNickname;
    private String socialProfilePicture;
}
