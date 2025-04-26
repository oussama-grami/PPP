package com.ppp.Ecopilot.DTO.Response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class CreateResponseDTO {
    private Long questionId;
    private Long optionId;
}
