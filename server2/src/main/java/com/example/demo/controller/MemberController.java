package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.service.MemberService;
import com.example.demo.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/api/getMember")
    public ResponseEntity<APIResponseDTO<ResponseMemberDTO>> getMember(@CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<ResponseMemberDTO>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }
        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<ResponseMemberDTO>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }
        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        ResponseMemberDTO responseMemberDTO = memberService.getMember(memberId);
        if (responseMemberDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<ResponseMemberDTO>builder()
                    .resultCode("404")
                    .message("조회되는 member가 없습니다 (memberId 없음)")
                    .data(responseMemberDTO)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<ResponseMemberDTO>builder()
                .resultCode("200")
                .message("member 정보 불러오기 성공")
                .data(responseMemberDTO)
                .build());
    }

    @DeleteMapping("/api/deleteMember")
    public ResponseEntity<APIResponseDTO<Integer>> deleteMember(@CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Integer>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }
        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Integer>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }
        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        int result = memberService.deleteMember(memberId);
        if (result == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<Integer>builder()
                    .resultCode("404")
                    .message("조회되는 member가 없습니다 (memberId 없음)")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Integer>builder()
                .resultCode("200")
                .message("member 삭제 성공")
                .data(result)
                .build());
    }


}
