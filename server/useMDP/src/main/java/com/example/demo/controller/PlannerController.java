package com.example.demo.controller;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class PlannerController {
    @Autowired
    PlannerService plannerService;

    //로드맵 리스트 모두 가져오기
    //외래키로 유저 정보까지 가져옴
    @GetMapping("/planner")
    @ResponseBody
    public List<MemberDTO> getPlannerAll() {
        System.out.println("플래너 요청");
        return plannerService.getPlannerList();
    }

    @GetMapping("/plannerTest")
    @ResponseBody
    public List<PlannerDTO> getPlannerById(){return plannerService.getPlannerById();}


    @GetMapping("/planner/default")
    @ResponseBody
    public List<PlannerDTO> getPlanner(){return plannerService.getPlanner();}

    //내 로드맵 가져오기
    //test 위해 RequestParam 사용
//    @GetMapping("/planner/my")
//    @ResponseBody
//    public List<PlannerDTO> getMyPlanner(@RequestParam long userId) {
//        return plannerService.getMyPlannerList(userId);
//    }


}
