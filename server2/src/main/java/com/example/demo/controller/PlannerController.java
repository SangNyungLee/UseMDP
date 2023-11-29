package com.example.demo.controller;

import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.RequestDTO.*;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.service.PlannerService;
import com.example.demo.utils.EncodingConversionUtil;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.SwaggerPlannerAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    // 내꺼여부 상관없이 public 모두 불러오기
    public ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getAllPublicPlanners() {
        List<ResponsePlannerDTO> data = plannerService.getAllPublicPlanners();
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                .resultCode("200")
                .message("모든 플래너들 불러오기 성공")
                .data(data)
                .build());
    }

    //인기순 정렬된 플래너들 가져오기
    @Override
    @GetMapping("/api/getPlanner/trending")
    // 쿠키 있으면, 내꺼 빼고, public 애들 전부 trending 순으로
    // 쿠키 없으면 public 전부
    public ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getTrendingPlanner(@CookieValue(name = "auth", required = false) String token) {
        String memberId;
        if(token != null) {
            memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        } else {
            memberId = null;
        }
        List<ResponsePlannerDTO> allTrendingPlanners = plannerService.getTrendingPlanner(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                .resultCode("200")
                .message("모든 플래너들 인기순으로 불러오기 성공")
                .data(allTrendingPlanners)
                .build());
    }

    //기본 플래너들 가져오기
    @Override
    @GetMapping("/api/getPlanner/default")
    public ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getDefaultPlanner() {
        List<ResponsePlannerDTO> data = plannerService.getDefaultPlanner();
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                .resultCode("200")
                .message("모든 기본 플래너들 불러오기 성공")
                .data(data)
                .build());
    }


    // 특정 플래너 정보 가져오기
    @Override
    @GetMapping("api/getPlanner/{plannerIdBTOA}")
    public ResponseEntity<APIResponseDTO<ResponsePlannerDTO>> getPlanner(@PathVariable("plannerIdBTOA") String plannerIdBTOA) {
        System.out.println("plannerIdBTOA = " + plannerIdBTOA);
        long plannerId = Long.parseLong(EncodingConversionUtil.decodeBase64(plannerIdBTOA));
        ResponsePlannerDTO data =  plannerService.getPlanner(plannerId);
        if (data == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                    .resultCode("404")
                    .message("요청한 플래너가 없습니다")
                    .data(null)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                .resultCode("200")
                .message("요청한 플래너 불러오기 성공")
                .data(data)
                .build());
    }

    // 특정 사용자의 모든 플래너 가져오기
    @Override
    @GetMapping("api/getMyPlanner")
    public ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getPlanners(@CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }
        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }
        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        List<ResponsePlannerDTO> data = plannerService.getPlannersByMember(memberId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(APIResponseDTO.<List<ResponsePlannerDTO>>builder()
                        .resultCode("200")
                        .message("요청 성공")
                        .data(data)
                        .build());
    }

    //플래너 생성 -> plannerId 반환
    @Override
    @PostMapping("/api/postPlanner")
    public ResponseEntity<APIResponseDTO<Long>> postPlanner(@RequestBody RequestPostPlannerDTO requestPostPlannerDTO, @CookieValue(name = "auth", required = false) String token) {

        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        long result = plannerService.postPlanner(requestPostPlannerDTO, memberId);

        if (result == -1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("플래너 생성 실패")
                    .data(result)
                    .build());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Long>builder()
                .resultCode("201")
                .message("플래너 생성 완료, 생성된 plannerId 반환")
                .data(result)
                .build());
    }

    // JSON으로 플래너 생성
    @Override
    @PostMapping("/api/postPlanner/json")
    public ResponseEntity<APIResponseDTO<Long>> postJSONPlanner(@RequestBody RequestPostJSONPlannerDTO requestPostJSONPlannerDTO, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }
        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());

        long result = plannerService.postJSONPlanner(requestPostJSONPlannerDTO, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("플래너 생성 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Long>builder()
                .resultCode("201")
                .message("플래너 생성 성공, 생성된 plannerId 반환")
                .data(result)
                .build());
    }


    //플래너 복제하기
    @Override
    @PostMapping("/api/postPlanner/copy")
    public ResponseEntity<APIResponseDTO<Long>> postPlannerCopy(@RequestBody RequestPostPlannerCopyDTO requestPostPlannerCopyDTO, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        long result = plannerService.postPlannerCopy(requestPostPlannerCopyDTO, memberId);
        if (result == -1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("플래너 복사 및 생성 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<Long>builder()
                .resultCode("201")
                .message("플래너 복사 및 생성 성공")
                .data(result)
                .build());
    }

    //특정 플래너에 카드들 생성 후 해당 플래너 반환
    @Override
    @PostMapping("/api/postPlannerWithCards")
    public ResponseEntity<APIResponseDTO<ResponsePlannerDTO>> postPlannerWithCards(@RequestBody RequestPostPlannerWithCardsDTO requestPostPlannerWithCardsDTO, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        ResponsePlannerDTO data = plannerService.postPlannerWithCards(requestPostPlannerWithCardsDTO, memberId);
        if(data == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                    .resultCode("204")
                    .message("memberId 혹은 plannerId 존재하지 않음")
                    .data(data)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(APIResponseDTO.<ResponsePlannerDTO>builder()
                .resultCode("201")
                .message("planner 생성완료")
                .data(data)
                .build());
    }


    //특정 플래너 수정
    @Override
    @PatchMapping("/api/patchPlanner")
    public ResponseEntity<APIResponseDTO<Long>> patchPlanner(@RequestBody RequestPatchPlannerDTO requestPatchPlannerDTO, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        long result = plannerService.patchPlanner(requestPatchPlannerDTO, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("플래너 수정 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Long>builder()
                .resultCode("200")
                .message("플래너 수정 완료")
                .data(result)
                .build());
    }


    // 특정 플래너 좋아요 +1
    @Override
    @PostMapping("/api/postPlanner/like")
    public ResponseEntity<APIResponseDTO<Long>> likePlanner(@RequestBody PlannerIdDTO plannerIdDTO, @CookieValue(name = "auth", required = false) String token) {
        System.out.println("token = "+token);
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }
        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }
        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        long plannerId = plannerIdDTO.getPlannerId();
        long result = plannerService.likePlanner(plannerId, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("좋아요 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Long>builder()
                .resultCode("200")
                .message("좋아요 완료")
                .data(result)
                .build());
    }
    // 특정 플래너 좋아요 -1
    @Override
    @DeleteMapping("/api/patchPlanner/unlike")
    public ResponseEntity<APIResponseDTO<Long>> unlikePlanner(@RequestBody PlannerIdDTO plannerIdDTO, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }
        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());

        long result = plannerService.unlikePlanner(plannerIdDTO, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("좋아요 취소 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Long>builder()
                .resultCode("200")
                .message("좋아요 취소 완료")
                .data(result)
                .build());
    }

    // 특정 플래너 삭제
    @Override
    @DeleteMapping("api/deletePlanner/{plannerId}")
    public ResponseEntity<APIResponseDTO<Long>> deletePlanner(@PathVariable long plannerId, @CookieValue(name = "auth", required = false) String token) {
        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("로그인 되지 않은 사용자입니다")
                    .data(null)
                    .build());
        }

        boolean tokenExpired = JwtTokenUtil.isExpired(token, jwtTokenUtil.getSecretKey());
        if(tokenExpired) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponseDTO.<Long>builder()
                    .resultCode("401")
                    .message("만료된 토큰입니다. 다시 로그인하세요")
                    .data(null)
                    .build());
        }

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        long result = plannerService.deletePlanner(plannerId, memberId);
        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseDTO.<Long>builder()
                    .resultCode("400")
                    .message("플래너 삭제 실패")
                    .data(result)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(APIResponseDTO.<Long>builder()
                .resultCode("200")
                .message("플래너 삭제 완료")
                .data(result)
                .build());

    }
}