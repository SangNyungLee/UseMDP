package com.example.demo.controller;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardController {

    @Autowired
    private CardService cardService;

    // 플래너의 전체 카드 목록 조회
    @GetMapping("/api/getCards/{plannerId}")
    public List<CardEntity> getCards(@PathVariable long plannerId) {
        return null;
    }

    // 특정 카드의 정보 조회
    @GetMapping("/api/getCard/{cardId}")
    public CardEntity getCard(@PathVariable long cardId) {
        return null;
    }

    // 특정 카드 생성
    @PostMapping("/api/postCard")
    public boolean postCard(@RequestBody  CardDTO cardDTO) {
        cardService.postCard(cardDTO);
        return true;
    }

    //특정카드와 그안에 있는 체크리스트들 수정하기
    @PatchMapping("api/patchCard")
    public int patchCard(@RequestBody CardDTO cardDTO) {
        return cardService.patchCard(cardDTO);
    }

    //카드 순서 수정하기
    @PatchMapping("api/patchMoveCards")
    public int changeCardOrder(@RequestBody RequestChangeCardOrderDTO requestChangeCardOrderDTO) {
        return cardService.changeCardOrder(requestChangeCardOrderDTO);
    }

    // 특정 플래너 특정 카드 삭제
    @DeleteMapping("api/deleteCard/{cardId}")
    public int deleteCard(@PathVariable long cardId) {
        return cardService.deleteCard(cardId);
    }
}
