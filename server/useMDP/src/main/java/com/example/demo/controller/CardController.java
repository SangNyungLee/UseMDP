package com.example.demo.controller;

import com.example.demo.dto.CardDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="Card")
@RestController
public class CardController {

    @Autowired
    private CardService cardService;

    // 플래너의 전체 카드 목록 조회
    @Operation(summary = "모든 카드 가져오기", description = "모든 카드의 정보를 가져온다")
    @GetMapping("/api/cards/{plannerId}")
    public List<CardEntity> getCards(@PathVariable long plannerId) {
        return null;
    }


    // 특정 카드의 정보 조회
    @Operation(summary = "특정 카드 가져오기", description = "특정 카드의 정보를 가져온다")
    @GetMapping("/api/card/{cardId}")
    public CardEntity getCard(@PathVariable long cardId) {
        return null;
    }

    // 특정 카드 생성
    @Operation(summary = "카드 생성하기", description = "카드를 생성한다")
    @PostMapping("/api/card")
    public boolean postCard(@RequestBody  CardDTO cardDTO) {
        cardService.postCard(cardDTO);
        return true;
    }
    // 특정 카드 수정
    @Operation(summary = "카드 수정하기" ,description = "카드를 수정한다")
    @PatchMapping("/api/card")
    public boolean patchCard(CardDTO cardDTO) {
        return true;
    }
    // 특정 카드 삭제
    @Operation(summary = "카드 삭제하기" ,description = "카드를 삭제한다")
    @DeleteMapping("/api/card/{cardId}")
    public boolean deleteCard(@PathVariable long cardId) {
        return true;
    }
}
