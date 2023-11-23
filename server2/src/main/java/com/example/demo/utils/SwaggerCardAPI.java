package com.example.demo.utils;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Tag(name = "Card Controller", description = "Card CRUD API")
public interface SwaggerCardAPI {
    @Operation(
            summary = "카드 생성",
            description = "플래너 아이디로 새로운 카드 생성")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "실패 = 0, 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int postCard(@RequestBody CardDTO cardDTO);

    @Operation(
            summary = "카드 수정",
            description = "플래너 아이디로 기존 카드 수정")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "실패 = 0, 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int patchCard(@RequestBody CardDTO cardDTO);

    @Operation(
            summary = "카드 순서 intOrder 및 cardStatus 수정",
            description = "플래너 아이디로 기존 카드의 순서와 상태 수정")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "실패 = 0, 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int changeCardOrder(@RequestBody RequestChangeCardOrderDTO requestChangeCardOrderDTO);

    @Operation(
            summary = "특정 카드 삭제",
            description = "카드 아이디로 해당 카드 삭제")
    @ApiResponses(value = {
            @ApiResponse(
                    description = "실패 = 0, 성공 = 1",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "integer")
                            )
                    }
            )
    })
    int deleteCard(@PathVariable String cardId);
}
