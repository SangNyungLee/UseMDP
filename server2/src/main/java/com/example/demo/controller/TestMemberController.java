package com.example.demo.controller;

import com.example.demo.dto.RequestDTO.RequestTestSaveMemberDTO;
import com.example.demo.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping("/api/postMember")
    public void postMember(@RequestBody RequestTestSaveMemberDTO requestTestSaveMemberDTO) {
        memberService.saveMember(requestTestSaveMemberDTO);
    }
}
