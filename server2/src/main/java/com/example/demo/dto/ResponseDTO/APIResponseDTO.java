package com.example.demo.dto.ResponseDTO;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class APIResponseDTO<T> {
    private String resultCode;
    private String message;
    private T data;
}
