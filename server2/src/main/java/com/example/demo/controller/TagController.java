package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseTagDTO;
import com.example.demo.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/api/getTags")
    public ResponseEntity<APIResponseDTO<List<ResponseTagDTO>>> getAllTags() {
        List<ResponseTagDTO> data = tagService.getAllTags();
        if (data.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(APIResponseDTO.<List<ResponseTagDTO>>builder()
                        .resultCode("200")
                        .message("태그들 조회 성공")
                        .data(data)
                        .build());
    }
}
