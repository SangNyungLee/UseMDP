package com.example.demo.controller;

import com.example.demo.dto.LikeDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseLikeDTO;
import com.example.demo.dto.ResponseDTO.ResponsePlannerDTO;
import com.example.demo.repository.LikeRepository;
import com.example.demo.service.LikeService;
import com.example.demo.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/api/getLikes")
    public List<ResponseLikeDTO> getLikes(@CookieValue(name = "auth", required = false) String token) {

        String memberId = JwtTokenUtil.getMemberId(token, jwtTokenUtil.getSecretKey());
        return likeService.getPlanner(memberId);
    }

}
