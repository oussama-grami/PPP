package com.ppp.Ecopilot.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
@AllArgsConstructor
public class EsgResponseDTO {

    private String questionText;
    private String optionText;
    private int score;


}