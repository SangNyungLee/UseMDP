package com.example.demo.controller;

import com.example.demo.dto.CodeDTO;
import com.example.demo.dto.SocialLoginDTO.SocialDTO;
import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import com.example.demo.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    GoogleLoginService googleLoginService;
    @Autowired
    GithubLoginService githubLoginService;

    private final JwtTokenUtil jwtTokenUtil;

    public LoginController(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/api/googleCode")
    public String googleLogin(@RequestBody CodeDTO codeDTO){
        String code = codeDTO.getAuthorizationCode();
        Map<String, String> result = googleLoginService.socialLogin(code, "registergoogle");
        System.out.println("아이디: " + result.get("id"));
        System.out.println("닉네임: " + result.get("nickname"));
        String id = result.get("id");
        String token = jwtTokenUtil.createToken(id);

        return token;
    }
    @PostMapping("/api/githubCode")
    public String githubLogin(@RequestBody CodeDTO codeDTO){
        String code = codeDTO.getAuthorizationCode();
        System.out.println("코드값 " + code);
        SocialDTO member = githubLoginService.gitLogin(code);
        System.out.println("++++++++++++" + member.toString());
        return "git Success";
    }

//    @GetMapping("/login/oauth2/code/{registrationId}")
//    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
//        if ("github".equals(registrationId)) {
//            System.out.println(code);
//            githubLoginService.gitLogin(code);
//        }else{
//                Map<String, String> result = googleLoginService.socialLogin(code, registrationId);
//                System.out.println("2번 register" + registrationId);
//                System.out.println("아이디: " + result.get("id"));
//                System.out.println("닉네임: " + result.get("nickname"));
//        }
//    }
}
