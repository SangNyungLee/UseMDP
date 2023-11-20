package com.example.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URL;

@Controller
@Slf4j
public class GoogleLoginController {
    @GetMapping("/login/oauth2/code/google")
    public void googleLogin(@RequestParam("registrationId") String code) {
        System.out.println("코드 : " + code);
    }
}
