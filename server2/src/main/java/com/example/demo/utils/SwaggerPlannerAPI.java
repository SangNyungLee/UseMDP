package com.example.demo.utils;

import com.example.demo.dto.LikeDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.dto.PlannerIdDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
    @Operation(
            summary = "전체 플래너들 조회",
            description = "DB에 존재하는 모든 플래너들 가져오기")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "planner 객체 배열",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ResponsePlannerDTO.class))
                            )
                    }
            )
    })
    List<ResponsePlannerDTO> getAllPlanners();

    @Operation(
            summary = "전체 플래너들 조회 (인기순)",
            description = "DB에 존재하는 모든 플래너들 인기순으로 가져오기")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "planner 객체 배열",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ResponsePlannerDTO.class))
                            )
                    }
            )
    })
    List<ResponsePlannerDTO> getTrendingPlanner();

    @Operation(
            summary = "기본 플래너들 조회",
            description = "DB에 존재하는 모든 기본 플래너들 가져오기")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "planner 객체 배열",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ResponsePlannerDTO.class))
                            )
                    }
            )
    })
    List<ResponsePlannerDTO> getDefaultPlanner();


    @Operation(
            summary = "특정 플래너 조회",
            description = "DB에 존재하는 모든 플래너들 중 특정 플래너를 plannerId 로 가져오기"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    description = "planner 객체",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ResponsePlannerDTO.class)
                            )
                    }
            )
    })
    ResponsePlannerDTO getPlanner(@PathVariable String plannerIdBTOA);

    @Operation(summary = "특정 사용자가 가지고있는 모든 플래너들 조회", description = "DB에 존재하는 특정 사용자의 모든 기본 플래너들 가져오기")
    ResponseEntity<APIResponseDTO<List<ResponsePlannerDTO>>> getPlanners(@CookieValue(name = "auth") String token);

    @Operation(summary = "특정 사용자의 플래너 생성", description = "DB에 존재하는 특정 사용자의 플래너 새로 생성")
    ResponseEntity<APIResponseDTO<Long>> postPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "auth") String token);

    @Operation(summary = "특정 플래너를 복사후 특정 사용자의 것으로 생성", description = "DB에 존재하는 특정 플래너를 조회하여 복사하고, 사용자의의 플래너로 복사된 플래너를 생성")
    ResponseEntity<APIResponseDTO<Long>> postPlannerCopy(@RequestBody PlannerIdDTO plannerIdDTO, @CookieValue(name = "auth", required = false) String token);

    @Operation(summary = "특정 플래너 수정", description = "DB에 존재하는 특정 플래너 수정")
    ResponseEntity<APIResponseDTO<Long>> patchPlanner(@RequestBody PlannerDTO plannerDTO, @CookieValue(name = "auth", required = false) String token);

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
    int likePlanner(@RequestBody LikeDTO LikeDTO);


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
    int unlikePlanner(@RequestBody LikeDTO LikeDTO);


    @Operation(summary = "특정 플래너 삭제", description = "DB에 존재하는 특정 플래너 삭제")
    ResponseEntity<APIResponseDTO<Long>> deletePlanner(@PathVariable long plannerId, @CookieValue(name = "auth", required = false) String token);
}
