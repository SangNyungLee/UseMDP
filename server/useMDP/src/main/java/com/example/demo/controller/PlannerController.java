package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.service.PlannerService;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
