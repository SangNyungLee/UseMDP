package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PlannerController {
    @Autowired
    PlannerService plannerService;

    //플래너 리스트 모두 가져오기
    @GetMapping("/planner")
    @ResponseBody
    public List<PlannerDTO> getPlannerAll() {
        return plannerService.getPlannerList();
    }
}
