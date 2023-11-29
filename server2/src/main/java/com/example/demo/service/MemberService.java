package com.example.demo.service;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.RequestDTO.RequestTestSaveMemberDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import com.example.demo.dto.SocialLoginDTO.SocialDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public ResponseMemberDTO getMember(String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return null;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        return ResponseMemberDTO.builder()
                .socialCategory(memberEntity.getSocialCategory())
                .socialNickname(memberEntity.getSocialId())
                .socialId(memberEntity.getSocialId())
                .socialProfilePicture(memberEntity.getSocialProfilePicture())
                .build();
    }

    @Transactional
    public int deleteMember(String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        try {
            memberRepository.delete(memberEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
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
            try {
                MemberEntity updatedMember = memberRepository.save(memberEntity);
                return MemberDTO.builder()
                        .memberId(updatedMember.getMemberId())
                        .socialCategory(updatedMember.getSocialCategory())
                        .socialId(updatedMember.getSocialId())
                        .socialNickname(updatedMember.getSocialNickname())
                        .socialProfilePicture(updatedMember.getSocialProfilePicture())
                        .createdAt(updatedMember.getCreatedAt())
                        .updatedAt(updatedMember.getUpdatedAt())
                        .build();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        } else {
            MemberEntity memberEntity = MemberEntity.builder()
                    .socialCategory(user.getSocialCategory())
                    .socialId(user.getSocialId())
                    .socialNickname(user.getSocialNickname())
                    .socialProfilePicture(user.getSocialProfilePicture())
                    .build();
            try {
                MemberEntity updatedMember = memberRepository.save(memberEntity);
                return MemberDTO.builder()
                        .memberId(updatedMember.getMemberId())
                        .socialCategory(updatedMember.getSocialCategory())
                        .socialId(updatedMember.getSocialId())
                        .socialNickname(updatedMember.getSocialNickname())
                        .socialProfilePicture(updatedMember.getSocialProfilePicture())
                        .createdAt(updatedMember.getCreatedAt())
                        .updatedAt(updatedMember.getUpdatedAt())
                        .build();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
    }
}
