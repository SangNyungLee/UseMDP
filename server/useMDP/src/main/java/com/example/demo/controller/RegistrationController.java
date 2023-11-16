package com.example.demo.controller;

import com.example.demo.model.dto.LoginDTO;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody LoginDTO loginDTO) {
        // 여기서 UserDTO는 사용자의 입력을 나타내는 데이터 전송 객체입니다.
        // userService.register(userDTO); // 사용자 등록 로직을 호출하는 부분
        userService.registerUser(loginDTO);
        return ResponseEntity.ok("User registered successfully");
    }
}