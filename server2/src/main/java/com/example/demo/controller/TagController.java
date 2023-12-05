package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseCardDTO;
import com.example.demo.dto.ResponseDTO.ResponseTagDTO;
import com.example.demo.service.TagService;
import com.example.demo.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/api/getTags")
    public ResponseEntity<APIResponseDTO<List<ResponseTagDTO>>> getAllTags() {
        List<ResponseTagDTO> data = tagService.getAllTags();
        if (data.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(APIResponseDTO.<List<ResponseTagDTO>>builder()
                        .resultCode("200")
                        .message("태그들 조회 성공")
                        .data(data)
                        .build());
    }

    @DeleteMapping("/api/deleteTaglist/{plannerId}")
    public ResponseEntity<APIResponseDTO<Integer>> deleteTaglist(@PathVariable long plannerId, @CookieValue(name = "auth") String token) {
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
        int result = tagService.deleteTaglist(plannerId, memberId);
        if (result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Integer>builder()
                    .resultCode("400")
                    .message("plannerId 없거나 memberId 없음")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Integer>builder()
                .resultCode("200")
                .message("삭제 성공")
                .data(result)
                .build());
    }
}
