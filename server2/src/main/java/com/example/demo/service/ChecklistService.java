package com.example.demo.service;

import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChecklistService {
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private MemberRepository memberRepository;
    public int deleteCheckList(long checkListId, String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberId);
        if(optionalMemberEntity.isEmpty()) {
            return 0;
        }
        MemberEntity memberEntity = optionalMemberEntity.get();
        Optional<ChecklistEntity> optionalCheckListEntity = checklistRepository.findById(checkListId);
        if(optionalCheckListEntity.isEmpty()) {
            return 0;
        }
        ChecklistEntity checklistEntity = optionalCheckListEntity.get();
        checklistRepository.delete(checklistEntity);
        Optional<ChecklistEntity> deletedCard = checklistRepository.findById(checkListId);
        if(deletedCard.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }
}
