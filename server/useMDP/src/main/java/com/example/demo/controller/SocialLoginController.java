package com.example.demo.controller;

import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login/oauth2/code")
public class SocialLoginController {

    @Autowired
    GoogleLoginService googleLoginService;
    @Autowired
    GithubLoginService githubLoginService;
    public SocialLoginController(GoogleLoginService googleLoginService){
        this.googleLoginService = googleLoginService;
    }

    @GetMapping("/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
        if ("github".equals(registrationId)) {
            System.out.println("code값!!" + code);
            githubLoginService.gitLogin(code);
        }else{
            googleLoginService.socialLogin(code, registrationId);
        }

    }
}