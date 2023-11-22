//package com.example.demo.controller;
//
//import com.example.demo.dto.CardDTO;
//import com.example.demo.dto.PlannerDTO;
//import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
//import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
//import com.example.demo.service.CardService;
//import com.example.demo.service.PlannerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Base64;
//import java.util.List;
//
//@RestController
//public class Controller {
//
//    @Autowired
//    private PlannerService plannerService;
//    @Autowired
//    private CardService cardService;
//
//    //(모든 정보 반환) (btoa(plannerId)) => atob 변환 필요
//    //-> 특정 내 로드맵 가져오기 : api/planner/{plannerIdBTOA}
////    @GetMapping("api/planner/{plannerIdBTOA}")
////    public ResponsePlannerDTO getPlanner(@PathVariable String plannerIdBTOA) {
////        // BTOA (Base-64 로 인코딩된 plannerId -> byteArray -> String -> Long 디코딩)
////        System.out.println("plannerIdBTOA = " + plannerIdBTOA);
////        byte[] byteArray = Base64.getDecoder().decode(plannerIdBTOA);
////        String decodedString = new String(byteArray);
////        System.out.println("Decoded String: " + decodedString);
////        Long decodedPlannerId = Long.parseLong(decodedString);
////        System.out.println("decodedPlannerId: " + decodedPlannerId);
////
////        return plannerService.getPlanner(decodedPlannerId);
////    }
//
////    @GetMapping("api/myplanner")
////    public List<ResponsePlannerDTO> getPlanners() {
////        long memberId = 1;
////        return plannerService.getPlannersByMember(memberId);
////    }
//
////    //특정카드와 그안에 있는 체크리스트들 수정하기
////    @PatchMapping("api/card")
////    public int patchCard(@RequestBody CardDTO cardDTO) {
////        return cardService.patchCard(cardDTO);
////    }
//
////    //카드 순서 수정하기
////    @PatchMapping("api/movecards")
////    public int changeCardOrder(@RequestBody RequestChangeCardOrderDTO requestChangeCardOrderDTO) {
////        return cardService.changeCardOrder(requestChangeCardOrderDTO);
////    }
//
////    // 특정 플래너 삭제
////    @DeleteMapping("api/planner/{plannerId}")
////    public int deletePlanner(@PathVariable long plannerId) {
////        return plannerService.deletePlanner(plannerId);
////    }
//
////    // 특정 틀래너의 특정 카드 삭제
////    @DeleteMapping("api/card/{cardId}")
////    public int deleteCard(@PathVariable long cardId) {
////        return cardService.deleteCard(cardId);
////    }
//}
