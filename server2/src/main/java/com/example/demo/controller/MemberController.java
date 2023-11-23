package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MemberController {

    @GetMapping("/api/members")
    public String getMembers() {
        return "getMembers";
    }

}
