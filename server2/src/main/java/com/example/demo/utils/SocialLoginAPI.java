package com.example.demo.utils;

import com.example.demo.dto.CodeDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Social Login API", description = "소셜 로그인 API")
public interface SocialLoginAPI {

    @Operation(summary = "Google Login", description = "구글에서 사용자 정보 받아와서 우리 DB에 저장하고 사용자의 정보 반환, 그리고 사용자의 memberId 가 인코딩된 jwt 가 담긴 쿠키 발급")
    ResponseEntity<APIResponseDTO<ResponseMemberDTO>> googleLogin(@RequestBody CodeDTO codeDTO, HttpServletResponse response);

    @Operation(summary = "GitHub Login", description = "깃허브에서 사용자 정보 받아와서 우리 DB에 저장하고 사용자의 정보 반환, 그리고 사용자의 memberId 가 인코딩된 jwt 가 담긴 쿠키 발급")
    ResponseEntity<APIResponseDTO<ResponseMemberDTO>> githubLogin(@RequestBody CodeDTO codeDTO, HttpServletResponse response);
}