package com.example.demo.service;

import com.example.demo.dto.PlannerDTO;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlannerService {
    @Autowired
    PlannerRepository plannerRepository;


    //플래너 리스트 모두 가져오기
    public List<PlannerDTO> getPlannerList() {
        List<PlannerEntity> result = plannerRepository.getplannerList();
        List<PlannerDTO> list = new ArrayList<>();

        for(PlannerEntity planner : result) {
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .likePlanner(planner.getLikePlanner())
                    .email(planner.getEmail())
                    .thumbnail(planner.getThumbnail())
                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
                    .build();
            list.add(plannerDTO);
        }
        return list;
    }
}
