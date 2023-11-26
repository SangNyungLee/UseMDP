package com.example.demo.controller;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.dto.RequestDTO.RequestPostCardDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.service.CardService;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.SwaggerCardAPI;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardController implements SwaggerCardAPI {

    @Autowired
    private CardService cardService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 특정 카드 생성
    @Override
    @PostMapping("/api/postCard")
    public ResponseEntity<APIResponseDTO<Integer>> postCard(@RequestBody RequestPostCardDTO requestPostCardDTO, @CookieValue(name = "auth", required = false) String token) {
        System.out.println("token = " + token);
        System.out.println(token == null);
        System.out.println(requestPostCardDTO.getChecklists().get(0).toString() ) ;
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
        int result = cardService.postCard(requestPostCardDTO, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<Integer>builder()
                    .resultCode("404")
                    .message("일치하는 memberId 없거나 plannerId 없음")
                    .data(result)
                    .build());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Integer>builder()
                .resultCode("201")
                .message("생성완료 ")
                .data(result)
                .build());
    }

    //특정카드와 그안에 있는 체크리스트들 수정하기
    @Override
    @PatchMapping("api/patchCard")
    public int patchCard(@RequestBody CardDTO cardDTO) {
        return cardService.patchCard(cardDTO);
    }

    //카드 순서 수정하기
    @Override
    @PatchMapping("api/patchMoveCards")
    public int changeCardOrder(@RequestBody RequestChangeCardOrderDTO requestChangeCardOrderDTO) {
        return cardService.changeCardOrder(requestChangeCardOrderDTO);
    }

    // 특정 플래너 특정 카드 삭제
    @Override
    @DeleteMapping("api/deleteCard/{cardId}")
    public int deleteCard(@PathVariable String cardId) {
        return cardService.deleteCard(cardId);
    }
}
