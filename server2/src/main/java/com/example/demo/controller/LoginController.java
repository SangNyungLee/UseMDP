package com.example.demo.controller;

import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/login/oauth2/code")
public class LoginController {

    @Autowired
    GoogleLoginService googleLoginService;
    @Autowired
    GithubLoginService githubLoginService;

    @GetMapping("/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId, HttpSession session){
        if ("github".equals(registrationId)) {
            githubLoginService.gitLogin(code);
        }else{
                Map<String, String> result = googleLoginService.socialLogin(code, registrationId);
                System.out.println("아이디: " + result.get("id"));
                System.out.println("닉네임: " + result.get("nickname"));
                session.setAttribute("id", result.get("id"));
                session.setAttribute("nickname", result.get("nickname"));
        }
    }
}
