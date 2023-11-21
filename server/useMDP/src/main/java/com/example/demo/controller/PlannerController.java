package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.responseDTO.ResponsePlannerDTO;
import com.example.demo.service.PlannerService;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
public class PlannerController {

    @Autowired
    private PlannerService plannerService;

    //모든 플래너 가져오기
    @GetMapping("/api/planners")
    public List<PlannerDTO> getPlanners() {
        return plannerService.getPlanners();
    }

    //인기순 정렬된 플래너 가져오기
    @GetMapping("/api/planner/trending")
    public List<PlannerDTO> getTrendingPlanner() {
        return plannerService.getTrendingPlanner();
    }

    //기본 플래너 가져오기
    @GetMapping("/api/planner/default")
    public List<PlannerDTO> getDefaultPlanner() {
        return plannerService.getDefaultPlanner();
    }

    //내 특정 플래너 가져오기
    @GetMapping("api/planner/{plannerIdBTOA}")
    public ResponsePlannerDTO getPlanner(@PathVariable String plannerIdBTOA) {
        // BTOA (Base-64 로 인코딩된 plannerId -> byteArray -> String -> Long 디코딩)
        System.out.println("plannerIdBTOA = " + plannerIdBTOA);
        byte[] byteArray = Base64.getDecoder().decode(plannerIdBTOA);
        String decodedString = new String(byteArray);
        System.out.println("Decoded String: " + decodedString);
        Long decodedPlannerId = Long.parseLong(decodedString);
        System.out.println("decodedPlannerId: " + decodedPlannerId);

        return plannerService.getPlanner(decodedPlannerId);

    }


    //플래너 생성 -> plannerId 반환
    @PostMapping("/api/planner")
    public long postPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "memberId", required = false) Long memberId) {
        return plannerService.postPlanner(plannerDTO, memberId);
    }

    //플래너 수정
    @PatchMapping("/api/planner")
    public int patchPlanner(@RequestBody PlannerDTO plannerDTO) {
        return plannerService.patchPlanner(plannerDTO);
    }
}
