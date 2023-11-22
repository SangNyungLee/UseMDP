package com.example.demo.controller;

import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login/oauth2/code")
public class LoginController {

    @Autowired
    GoogleLoginService googleLoginService;
    @Autowired
    GithubLoginService githubLoginService;
    public LoginController(GoogleLoginService googleLoginService){
        this.googleLoginService = googleLoginService;
    }

    @GetMapping("/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
        if ("github".equals(registrationId)) {
            githubLoginService.gitLogin(code);
        }else{
            System.out.println("여기 들어오긴함");
            googleLoginService.socialLogin(code, registrationId);
        }

    }
}
