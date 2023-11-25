package com.example.demo.controller;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.service.PlannerService;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.SwaggerPlannerAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
public class PlannerController implements SwaggerPlannerAPI {

    @Autowired
    private PlannerService plannerService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 모든 플래너들 가져오기
    @Override
        @GetMapping("/api/getPlanners")
    public List<ResponsePlannerDTO> getAllPlanners() {
        return plannerService.getAllPlanners();
    }

    //인기순 정렬된 플래너들 가져오기
    @Override
    @GetMapping("/api/getPlanner/trending")
    public List<ResponsePlannerDTO> getTrendingPlanner() {
        return plannerService.getTrendingPlanner();
    }

    //기본 플래너들 가져오기
    @Override
    @GetMapping("/api/getPlanner/default")
    public List<ResponsePlannerDTO> getDefaultPlanner() {
        return plannerService.getDefaultPlanner();
    }


    // 특정 플래너 정보 가져오기
    @Override
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
    @Override
    @GetMapping("api/getMyPlanner")
    public ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getPlanners(@CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                            .resultCode("403")
                            .message("로그인 되지 않은 사용자입니다")
                            .data(null)
                            .build());
        } else {
            String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
            List<ResponsePlannerDTO> data = plannerService.getPlannersByMember(memberId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                            .resultCode("200")
                            .message("요청 성공")
                            .data(data)
                            .build());
        }
    }

    //플래너 생성 -> plannerId 반환
    @Override
    @PostMapping("/api/postPlanner")
    public ResponseEntity<APIResponseDTO<Long>> postPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "auth", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponseDTO.<Long>builder()
                    .resultCode("403")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(-1L)
                    .build());
        } else {
            String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
            long createdPlannerId = plannerService.postPlanner(plannerDTO, memberId);
            return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Long>builder()
                    .resultCode("201")
                    .message("플래너 생성 완료, 생성된 plannerId 반환")
                    .data(createdPlannerId)
                    .build());
        }
    }


    //플래너 복제하기
    @Override
    @PostMapping("/api/postPlanner/copy")
    public ResponseEntity<APIResponseDTO<Long>> postPlannerCopy(@RequestBody PlannerIdDTO plannerIdDTO, @CookieValue(name = "auth", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponseDTO.<Long>builder()
                    .resultCode("403")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(-1L)
                    .build());
        } else {
            String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
            long createdPlannerId = plannerService.postPlannerCopy(plannerIdDTO, memberId);

            return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Long>builder()
                    .resultCode("201")
                    .message("플래너 복제 완료")
                    .data(createdPlannerId)
                    .build());
        }
    }


    //특정 플래너 수정
    @Override
    @PatchMapping("/api/patchPlanner")
    public ResponseEntity<APIResponseDTO<Long>> patchPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "auth", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponseDTO.<Long>builder()
                    .resultCode("403")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(0L)
                    .build());
        } else {
            String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
            long result = plannerService.patchPlanner(plannerDTO, memberId);
            return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Long>builder()
                    .resultCode("201")
                    .message("플래너 수정 완료")
                    .data(result)
                    .build());
        }
    }

//    @PatchMapping("/api/patchPlannerInfo")
//    public int patchPlannerInfo(@RequestBody PlannerDTO plannerDTO) {
//        return plannerService.patchPlanner(plannerDTO);
//    }


    // 특정 플래너 좋아요 +1
    @Override
    @PatchMapping("/api/patchPlanner/like")
    public int likePlanner(@RequestBody PlannerIdDTO plannerIdDTO) {
        return plannerService.likePlanner(plannerIdDTO);
    }

    // 특정 플래너 좋아요 -1
    @Override
    @PatchMapping("/api/patchPlanner/unlike")
    public int unlikePlanner(@RequestBody PlannerIdDTO plannerIdDTO) {
        return plannerService.unlikePlanner(plannerIdDTO);
    }

    // 특정 플래너 삭제
    @Override
    @DeleteMapping("api/deletePlanner/{plannerId}")
    public ResponseEntity<APIResponseDTO<Long>> deletePlanner(@PathVariable long plannerId, @CookieValue(name = "auth", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponseDTO.<Long>builder()
                    .resultCode("403")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(0L)
                    .build());
        } else {
            String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
            long result = plannerService.deletePlanner(plannerId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(APIResponseDTO.<Long>builder()
                    .resultCode("204")
                    .message("플래너 삭제 완료")
                    .data(result)
                    .build());
        }
    }
}
