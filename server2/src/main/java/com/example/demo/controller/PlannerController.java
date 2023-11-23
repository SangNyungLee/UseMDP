package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
public class PlannerController {

    @Autowired
    private PlannerService plannerService;


    // 모든 플래너들 가져오기
    @GetMapping("/api/getPlanners")
    public List<PlannerDTO> getAllPlanners() {
        return plannerService.getPlanners();
    }

    //인기순 정렬된 플래너들 가져오기
    @GetMapping("/api/getPlanner/trending")
    public List<PlannerDTO> getTrendingPlanner() {
        return plannerService.getTrendingPlanner();
    }

    //기본 플래너들 가져오기
    @GetMapping("/api/getPlanner/default")
    public List<PlannerDTO> getDefaultPlanner() {
        return plannerService.getDefaultPlanner();
    }

    // 특정 플래너 정보 가져오기
    @GetMapping("api/getPlanner/{plannerIdBTOA}")
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

    // 특정 사용자의 모든 플래너 가져오기
    @GetMapping("api/getMyPlanner")
    public List<ResponsePlannerDTO> getPlanners() {
        long memberId = 1;
        return plannerService.getPlannersByMember(memberId);
    }

    //플래너 생성 -> plannerId 반환
    @PostMapping("/api/postPlanner")
    public long postPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "memberId", required = false) Long memberId) {
        return plannerService.postPlanner(plannerDTO, memberId);
    }


    //플래너 복제하기
//    @Operation(summary = "플래너 복제하기", description = "다른 플래너를 내 플래너 리스트에 드래그하거나 저장했을 때 플래너의 정보를 복제한다")
    @PostMapping("/api/postPlanner/copy")
    public long postPlannerCopy(@RequestBody PlannerIdDTO plannerIdDTO, @CookieValue(name = "memberId", required = false) String memberId) {
        if(memberId != null) {
            byte[] byteArray = Base64.getDecoder().decode(memberId);
            String decodedString = new String(byteArray);
            Long decodedMemberId = Long.parseLong(decodedString);


            return plannerService.postPlannerCopy(plannerIdDTO, decodedMemberId);
        }else {
            return -1;
        }
    }

    //플래너 수정
    @PatchMapping("/api/patchPlanner")
    public int patchPlanner(@RequestBody PlannerDTO plannerDTO) {
        return plannerService.patchPlanner(plannerDTO);
    }

    // 특정 플래너 삭제
    @DeleteMapping("api/deletePlanner/{plannerId}")
    public int deletePlanner(@PathVariable long plannerId) {
        return plannerService.deletePlanner(plannerId);
    }

}
