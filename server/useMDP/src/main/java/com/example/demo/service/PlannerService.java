package com.example.demo.service;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.PlannerDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class PlannerService {
    @Autowired
    PlannerRepository plannerRepository;

    @Autowired
    MemberRepository memberRepository;


    //로드맵 리스트 모두 가져오기+해당 로드맵을 작성한 유저 정보도 가져오기
    public Map<String,List> getPlannerList() {
        List<PlannerEntity> joinResult = plannerRepository.findAllPlannerWithMember();

        List<PlannerDTO> plannerList = new ArrayList<>();
        List<PlannerDTO.PlannerMemberDTO> plannerMemberList = new ArrayList<>();

        Map<String, List> result = new HashMap<>();


        for (PlannerEntity planner : joinResult) {
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
                    .build();

            PlannerDTO.PlannerMemberDTO plannerMemberDTO = new PlannerDTO.PlannerMemberDTO(planner.getMemberEntity());
            plannerMemberDTO.setEmail(planner.getMemberEntity().getEmail());
            plannerMemberDTO.setNickname(plannerMemberDTO.getNickname());

            plannerList.add(plannerDTO);
            plannerMemberList.add(plannerMemberDTO);

        }

        result.put("planner", plannerList);
        result.put("user", plannerMemberList);


        return result;
    }

    //기본 로드맵 가져오기
    public List<PlannerDTO> getPlannerListDefault() {
        List<PlannerEntity> defaultPlanner = plannerRepository.getPlannerListDefault();
        List<PlannerDTO> list = new ArrayList<>();

        for(PlannerEntity planner : defaultPlanner) {
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
                    .build();
            list.add(plannerDTO);
        }
        return list;
    }

    //내 로드맵 가져오기
    public Map<String,List> getMyPlannerList(long memberId) {
        List<PlannerEntity> joinResult = plannerRepository.getMyPlanner(memberId);

        List<PlannerDTO> plannerList = new ArrayList<>();
        List<PlannerDTO.PlannerMemberDTO> plannerMemberList = new ArrayList<>();

        Map<String, List> result = new HashMap<>();


        for (PlannerEntity planner : joinResult) {
            PlannerDTO plannerDTO = PlannerDTO.builder()
                    .plannerId(planner.getPlannerId())
                    .creator(planner.getCreator())
                    .title(planner.getTitle())
                    .likePlanner(planner.getLikePlanner())
                    .thumbnail(planner.getThumbnail())
                    .createAt(new SimpleDateFormat("yyyy-MM-dd").format(planner.getCreateAt()))
                    .build();

            PlannerDTO.PlannerMemberDTO plannerMemberDTO = new PlannerDTO.PlannerMemberDTO(planner.getMemberEntity());
            plannerMemberDTO.setEmail(planner.getMemberEntity().getEmail());
            plannerMemberDTO.setNickname(plannerMemberDTO.getNickname());

            plannerList.add(plannerDTO);
            plannerMemberList.add(plannerMemberDTO);

        }

        result.put("planner", plannerList);
        result.put("user", plannerMemberList);


        return result;

    }
    //특정 플래너 정보 가져오기

//    public Map<String, List> getMySpecificPlannerList(long plannerId) {
//    }





    //로드맵 수정하기(수정일자가 필요한가? -> createAt은 수정날짜가 아님)
    //creator는 우째 해야할지..? 프론트에서 넘겨줄지
    public boolean updatePlanner(PlannerDTO plannerDTO) {
        PlannerEntity plannerEntity = plannerRepository.findByPlannerId(plannerDTO.getPlannerId());

        PlannerEntity patchPlanner = PlannerEntity.builder()
                .plannerId(plannerEntity.getPlannerId())
                .creator(plannerEntity.getCreator())
                .title(plannerEntity.getTitle())
                .likePlanner(plannerEntity.getLikePlanner())
                .thumbnail(plannerEntity.getThumbnail())
                .build();
        plannerRepository.save(patchPlanner);
        return true;

    }
//
    //로드맵 삭제하기
    public boolean deletePlanner(long plannerId) {
        PlannerEntity plannerEntity = plannerRepository.findByPlannerId(plannerId);

        plannerRepository.delete(plannerEntity);
        return true;
    }


    //로드맵 추가(수정필요)
    //creator는 사용자 정보를 가져와야 하는데 프론트에서 creator도 같이 보내줘야할듯
    public boolean insertPlanner(PlannerDTO plannerDTO) {
        PlannerEntity plannerEntity = PlannerEntity.builder()
                .creator(plannerDTO.getCreator())
                .title(plannerDTO.getTitle())
                .build();
        plannerRepository.save(plannerEntity);
        return true;
    }
//

}
