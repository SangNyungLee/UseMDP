package com.example.demo.repository;

import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.entity.CardEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE CardEntity c SET c.intOrder = c.intOrder - 1 WHERE c.plannerEntity.plannerId = :#{#dto.plannerId} " +
            "AND c.cardStatus = :#{#dto.sourceCardStatus} AND c.intOrder > :#{#dto.sourceCardOrder}")
    void handleOriginalPosition(@Param("dto") RequestChangeCardOrderDTO requestChangeCardOrderDTO);

    @Transactional
    @Modifying
    @Query(value = "UPDATE CardEntity c SET c.intOrder = c.intOrder + 1 WHERE c.plannerEntity.plannerId = :#{#dto.plannerId} " +
            "AND c.cardStatus = :#{#dto.destinationCardStatus} AND c.intOrder >= :#{#dto.destinationCardOrder}")
    void handleNewPosition(@Param("dto") RequestChangeCardOrderDTO requestChangeCardOrderDTO);

}
