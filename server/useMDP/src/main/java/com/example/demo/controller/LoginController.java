package com.example.demo.controller;

import com.example.demo.model.dto.LoginDTO;
import com.example.demo.service.JwtTokenProvider;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;


@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @PostMapping
    public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginDTO) {
        // 여기서 LoginDTO는 로그인 시 사용자의 입력을 나타내는 데이터 전송 객체입니다.
        // 로그인 로직 호출 및 토큰 생성
        String token = authenticateAndGenerateToken(loginDTO.getUsername(), loginDTO.getPassword());


        ResponseCookie cookie1 = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .maxAge(60 * 60 * 24)
                .build();
        ResponseCookie cookie2 = ResponseCookie.from("accessToken2", token)
                .httpOnly(true)
                .maxAge(60 * 60 * 24)
                .path("/test")
                .build();
        // path("/test")라 하면 /test 에서만 쿠키가 나타남, 다른 페이지로 옮기면 쿠키가 사용할 수 없는 형태 같음


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .build()
                .toUri();

        // 토큰을 클라이언트에게 반환
        return ResponseEntity.created(location)
                .header(HttpHeaders.SET_COOKIE,cookie1.toString())
                .header(HttpHeaders.SET_COOKIE,cookie2.toString())
                .body(token);
        // 동시에 여러개의 쿠키도 전송 가능,
    }

    private String authenticateAndGenerateToken(String username, String password) {
        // Spring Security의 AuthenticationManager를 사용하여 로그인 인증을 수행

        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        // 인증이 성공하면 SecurityContext에 인증 정보를 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);


        // 사용자 정보를 기반으로 토큰 생성
        String token = jwtTokenProvider.createToken(authentication);
        return token;
    }
}
