package com.example.demo.service;

import com.example.demo.dto.RequestDTO.RequestTestSaveMemberDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public void saveMember(RequestTestSaveMemberDTO requestTestSaveMemberDTO) {
        MemberEntity memberEntity = MemberEntity.builder()
                .socialId(requestTestSaveMemberDTO.getSocialId())
                .socialNickname(requestTestSaveMemberDTO.getSocialNickname())
                .build();
        MemberEntity savedMember = memberRepository.save(memberEntity);
        System.out.println("savedMember = " + savedMember.toString());
    }
}
