package com.example.demo.service;

import com.example.demo.dto.ResponseDTO.ResponseTagDTO;
import com.example.demo.entity.TagEntity;
import com.example.demo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;


    public List<ResponseTagDTO> getAllTags() {
        List<TagEntity> tagEntities = tagRepository.findAll();
        return tagEntities.stream()
                .map(ResponseTagDTO::toResponseTagDTO)
                .collect(Collectors.toList());
    }
}
