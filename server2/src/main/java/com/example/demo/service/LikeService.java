package com.example.demo.service;

import com.example.demo.dto.ResponseDTO.ResponseLikeDTO;
import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.MemberEntity;
import com.example.demo.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;


    public List<ResponseLikeDTO> getPlanner(String memberId) {
        Optional<List<LikeEntity>> optionalLikeEntity = likeRepository.findByMemberId(memberId);

        if (optionalLikeEntity.isPresent()) {
            List<LikeEntity> likeEntities = optionalLikeEntity.get();
            List<ResponseLikeDTO> likeEntityList = new ArrayList<>();
            for (LikeEntity like : likeEntities) {
                ResponseLikeDTO responseLikeDTO = ResponseLikeDTO.builder()
                        .like_id(like.getLike_id())
                        .memberId(like.getMemberId())
                        .plannerId(like.getPlannerId())
                        .build();
                likeEntityList.add(responseLikeDTO);
            }
            return likeEntityList;
        }
        return null;

    }
}
