package com.example.demo.service;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.RequestDTO.RequestTestSaveMemberDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import com.example.demo.dto.SocialLoginDTO.SocialDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public void joinMember(RequestTestSaveMemberDTO requestTestSaveMemberDTO) {
        MemberEntity memberEntity = MemberEntity.builder()
                .socialId(requestTestSaveMemberDTO.getSocialId())
                .socialNickname(requestTestSaveMemberDTO.getSocialNickname())
                .build();
        MemberEntity savedMember = memberRepository.save(memberEntity);
        System.out.println("savedMember = " + savedMember.toString());
    }


    public MemberDTO saveMember(SocialDTO user) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findBySocialId(user.getSocialId());
        if (optionalMemberEntity.isPresent()) {
            MemberEntity originalMember = optionalMemberEntity.get();
            MemberEntity memberEntity = MemberEntity.builder()
                .memberId(originalMember.getMemberId())
                .socialId(user.getSocialId())
                .socialNickname(user.getSocialNickname())
                .socialProfilePicture(user.getSocialProfilePicture())
                .createdAt(originalMember.getCreatedAt())
                .build();
            MemberEntity updatedMember = memberRepository.save(memberEntity);
            return MemberDTO.builder()
                    .memberId(updatedMember.getMemberId())
                    .socialId(updatedMember.getSocialId())
                    .socialNickname(updatedMember.getSocialNickname())
                    .socialProfilePicture(updatedMember.getSocialProfilePicture())
                    .createdAt(updatedMember.getCreatedAt())
                    .updatedAt(updatedMember.getUpdatedAt())
                    .build();
        } else {
            MemberEntity memberEntity = MemberEntity.builder()
                    .socialId(user.getSocialId())
                    .socialNickname(user.getSocialNickname())
                    .socialProfilePicture(user.getSocialProfilePicture())
                    .build();
            MemberEntity updatedMember = memberRepository.save(memberEntity);
            return MemberDTO.builder()
                    .memberId(updatedMember.getMemberId())
                    .socialId(updatedMember.getSocialId())
                    .socialNickname(updatedMember.getSocialNickname())
                    .socialProfilePicture(updatedMember.getSocialProfilePicture())
                    .createdAt(updatedMember.getCreatedAt())
                    .updatedAt(updatedMember.getUpdatedAt())
                    .build();
        }
    }
}
