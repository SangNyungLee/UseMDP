package com.example.demo.controller;

import com.example.demo.dto.CardDTO;
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
    @GetMapping("/api/cards/{plannerId}")
    public List<CardEntity> getCards(@PathVariable long plannerId) {
        return null;
    }
    // 특정 카드의 정보 조회
    @GetMapping("/api/card/{cardId}")
    public CardEntity getCard(@PathVariable long cardId) {
        return null;
    }
    // 특정 카드 생성
    @PostMapping("/api/card")
    public boolean postCard(@RequestBody  CardDTO cardDTO) {
        cardService.postCard(cardDTO);
        return true;
    }
    // 특정 카드 수정
    @PatchMapping("/api/card")
    public boolean patchCard(CardDTO cardDTO) {
        return true;
    }
    // 특정 카드 삭제
    @DeleteMapping("/api/card/{cardId}")
    public boolean deleteCard(@PathVariable long cardId) {
        return true;
    }
}
