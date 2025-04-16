package com.ppp.Ecopilot.DTO;


import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EsgResultDTO {
    private int environment;
    private int social;
    private int governance;
    private int total;
}
