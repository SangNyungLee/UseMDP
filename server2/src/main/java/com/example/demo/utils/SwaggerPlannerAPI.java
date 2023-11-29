package com.example.demo.utils;

import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.RequestDTO.*;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Tag(name = "Planner Controller", description = "Planner CRUD API")
public interface SwaggerPlannerAPI {
    @Operation(summary = "DB에 있는 모든 PUBLIC 플래너들 기본정보 조회", description = "DB에 있는 모든 PUBLIC 플래너들 기본정보 조회")
    ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getAllPublicPlanners();

    @Operation(summary = "전체 플래너들 조회 (인기순)", description = "DB에 있는 모든 PUBLIC 플래너들 인기순으로 조회 (쿠키값 있으면 내꺼 빼고)")
    ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getTrendingPlanner(@CookieValue(name = "auth", required = false) String token);

    @Operation(summary = "기본 플래너들 조회", description = "DB에 존재하는 모든 기본 플래너들 가져오기")
    ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getDefaultPlanner();

    @Operation(summary = "특정 플래너 조회", description = "DB에 존재하는 모든 플래너들 중 특정 플래너를 plannerId 로 가져오기")
    ResponseEntity<APIResponseDTO<ResponsePlannerDTO>> getPlanner(@PathVariable String plannerIdBTOA);

    @Operation(summary = "특정 사용자가 가지고있는 모든 플래너들 조회", description = "DB에 존재하는 특정 사용자의 모든 기본 플래너들 가져오기")
    ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getPlanners(@CookieValue(name = "auth") String token);

    @Operation(summary = "특정 사용자의 플래너 생성", description = "DB에 존재하는 특정 사용자의 플래너 새로 생성, 생성된 plannerId 반환")
    ResponseEntity<APIResponseDTO<Long>> postPlanner(@RequestBody RequestPostPlannerDTO requestPostPlannerDTO, @CookieValue(name = "auth") String token);

    @Operation(summary = "특정 사용자의 플래너 (카드들과 함께) 생성", description = "DB에 존재하는 특정 사용자의 플래너 카드들과 함께 새로 생성, 생성된 planner 객체 반환")
    ResponseEntity<APIResponseDTO<ResponsePlannerDTO>> postPlannerWithCards(@RequestBody RequestPostPlannerWithCardsDTO requestPostPlannerWithCardsDTO, @CookieValue(name = "auth", required = false) String token);

    @Operation(summary = "JSON으로 받는 플래너 사용자한테 생성", description = "DB에 존재하는 특정 사용자의 플래너 새로 생성(JSON으로 전체 플래너 정보 받고 db에 모두 저장 (cards, checklists 포함)")
    ResponseEntity<APIResponseDTO<Long>> postJSONPlanner(@RequestBody RequestPostJSONPlannerDTO requestPostJSONPlannerDTO, @CookieValue(name = "auth", required = false) String token);

    @Operation(summary = "특정 플래너를 복사후 특정 사용자의 것으로 생성", description = "DB에 존재하는 특정 플래너를 조회하여 복사하고, 사용자의의 플래너로 복사된 플래너를 생성")
    ResponseEntity<APIResponseDTO<Long>> postPlannerCopy(@RequestBody RequestPostPlannerCopyDTO requestPostPlannerCopyDTO, @CookieValue(name = "auth", required = false) String token);

    @Operation(summary = "특정 플래너 수정", description = "DB에 존재하는 특정 플래너 수정")
    ResponseEntity<APIResponseDTO<Long>> patchPlanner(@RequestBody RequestPatchPlannerDTO requestPatchPlannerDTO, @CookieValue(name = "auth", required = false) String token);

    @Operation(
            summary = "특정 플래너 좋아요 +1",
            description = "DB에 존재하는 특정 플래너의 plannerLike 값 +1")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "수정 실패 = 0, 수정 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int likePlanner(@RequestBody PlannerIdDTO plannerIdDTO);

    @Operation(
            summary = "특정 플래너 좋아요 -1",
            description = "DB에 존재하는 특정 플래너의 plannerLike 값 -1")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "수정 실패 = 0, 수정 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int unlikePlanner(@RequestBody PlannerIdDTO plannerIdDTO);


    @Operation(summary = "특정 플래너 삭제", description = "DB에 존재하는 특정 플래너 삭제")
    ResponseEntity<APIResponseDTO<Long>> deletePlanner(@PathVariable long plannerId, @CookieValue(name = "auth", required = false) String token);
}