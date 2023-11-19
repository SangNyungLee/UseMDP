package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class PlannerController {
    @Autowired
    PlannerService plannerService;

    //로드맵 리스트 모두 가져오기 + 인기순 로드맵 리스트 가져오기
    //외래키로 유저 정보까지 가져옴
    @GetMapping("/planner")
    @ResponseBody
    public Map<String,List> getPlannerAll() {
        return plannerService.getPlannerList();
    }


    //기본 로드맵 리스트 모두 가져오기
    //구분은 defaultPlanner가 1인것을 가져옴
    @GetMapping("/planner/default")
    @ResponseBody
    public List<PlannerDTO> getPlannerDefault() {
        return plannerService.getPlannerListDefault();
    }

    //내 로드맵 가져오기
    //test 위해 RequestParam 사용
    //mapping 주소는 오류때문에 수정
    @GetMapping("/planner/my")
    @ResponseBody
    public Map<String,List> getMyPlannerList(@RequestParam long memberId) {
        return plannerService.getMyPlannerList(memberId);
    }

//    //내 특정 로드맵 가져오기
//    //test 위해 RequestParam 사용
//    @GetMapping("/planner/my/specific")
//    @ResponseBody
//    public Map<String,List> getMySpecificPlannerList(@RequestParam long plannerId) {
//        return plannerService.getMySpecificPlannerList(plannerId);
//    }



    //내 로드맵 가져오기
    //test 위해 RequestParam 사용
//    @GetMapping("/planner/my")
//    @ResponseBody
//    public List<PlannerDTO> getMyPlanner(@RequestParam long userId) {
//        return plannerService.getMyPlannerList(userId);
//    }


    //로드맵 추가
    @PostMapping("/planner/insert")
    @ResponseBody
    public boolean insertPlanner(@RequestBody PlannerDTO plannerDTO) {
        return plannerService.insertPlanner(plannerDTO);
    }


    //로드맵 수정
    @PatchMapping("/planner/update")
    @ResponseBody
    public boolean updatePlanner(PlannerDTO plannerDTO) {
        return plannerService.updatePlanner(plannerDTO);
    }

    //로드맵 삭제
    //test 위해 RequestParam 사용
    @DeleteMapping("/planner/delete")
    @ResponseBody
    public boolean deletePlanner(@RequestParam long plannerId){
        return plannerService.deletePlanner(plannerId);
    }


}
