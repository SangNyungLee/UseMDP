package com.example.demo.dto.RequestDTO;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RequestTestSaveMemberDTO {
    private long socialId;
    private String socialNickname;
}
