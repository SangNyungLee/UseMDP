package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.service.ChecklistService;
import com.example.demo.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private ChecklistService checklistService;


    // 특정 플래너 특정 카드 삭제
    @DeleteMapping("api/deleteCheckList/{checkListId}")
    public ResponseEntity<APIResponseDTO<Integer>> deleteChecklist(@PathVariable long checkListId, @CookieValue(name = "auth", required = false) String token) {
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

        int result =  checklistService.deleteCheckList(checkListId, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<Integer>builder()
                    .resultCode("404")
                    .message("일치하는 memberId 없거나 checkList 없음")
                    .data(result)
                    .build());
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Integer>builder()
                    .resultCode("200")
                    .message("체크리스트 삭제 완료 ")
                    .data(result)
                    .build());
        }
    }
}
