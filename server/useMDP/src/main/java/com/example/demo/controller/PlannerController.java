package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.responseDTO.ResponsePlannerDTO;
import com.example.demo.service.PlannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@Tag(name="Planner")
@RestController
public class PlannerController {

    @Autowired
    private PlannerService plannerService;

    //모든 플래너 가져오기
    @Operation(summary = "모든 플래너 가져오기",description = "모든 플래너의 정보를 가져온다")
    @GetMapping("/api/planners")
    public List<PlannerDTO> getPlanners() {
        return plannerService.getPlanners();
    }

    //인기순 정렬된 플래너 가져오기
    @Operation(summary = "인기 플래너 가져오기", description="인기순으로 정렬된 플래너의 정보를 가져온다")
    @GetMapping("/api/planner/trending")
    public List<PlannerDTO> getTrendingPlanner() {
        return plannerService.getTrendingPlanner();
    }

    //기본 플래너 가져오기
    @Operation(summary = "기본 플래너 가져오기", description="기본 플래너(default)의 정보를 가져온다")
    @GetMapping("/api/planner/default")
    public List<PlannerDTO> getDefaultPlanner() {
        return plannerService.getDefaultPlanner();
    }

    //내 특정 플래너 가져오기
    //후에 쿠키로 변경
    @Operation(summary = "내 특정 플래너 가져오기", description="내 특정 플래너의 정보와 카드정보, 체크리스트 정보를 가져온다")
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

    //플래너 복제하기
    @Operation(summary = "플래너 복제하기", description = "다른 플래너를 내 플래너 리스트에 드래그하거나 저장했을 때 플래너의 정보를 복제한다")
    @PostMapping("/api/planner/copy")
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




    //플래너 생성 -> plannerId 반환
    @Operation(summary = "플래너 생성하기", description="플래너를 생성한다")
    @PostMapping("/api/planner")
    public long postPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "memberId", required = false) String memberId) {
        if(memberId != null){
            byte[] byteArray = Base64.getDecoder().decode(memberId);
            String decodedString = new String(byteArray);
            Long decodedMemberId = Long.parseLong(decodedString);


            return plannerService.postPlanner(plannerDTO, decodedMemberId);
        }else {
            return -1;
        }

    }

    //플래너 수정
    @Operation(summary = "플래너 수정하기", description="플래너를 수정한다")
    @PatchMapping("/api/planner")
    public int patchPlanner(@RequestBody PlannerDTO plannerDTO) {
        return plannerService.patchPlanner(plannerDTO);
    }
}
