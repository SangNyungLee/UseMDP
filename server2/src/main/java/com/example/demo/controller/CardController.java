package com.example.demo.controller;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.service.CardService;
import com.example.demo.utils.SwaggerCardAPI;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardController implements SwaggerCardAPI {

    @Autowired
    private CardService cardService;

    // 특정 카드 생성
    @Override
    @PostMapping("/api/postCard")
    public int postCard(@RequestBody  CardDTO cardDTO) {
        return cardService.postCard(cardDTO);
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
