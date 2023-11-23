package com.example.demo.dto.RequestDTO;

import com.example.demo.entity.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestChangeCardOrderDTO {
    private long plannerId;
    private long sourceCardId;
    private int sourceCardOrder;
    private int destinationCardOrder;
    private CardEntity.CardStatus sourceCardStatus;
    private CardEntity.CardStatus destinationCardStatus;
}
