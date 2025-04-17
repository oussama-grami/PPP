package com.ppp.Ecopilot.DTO;


import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.YearMonth;

@MappedSuperclass
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarbonFootprintHistoryDTO {
    private Long id;
    private YearMonth date;
    private boolean predicted;
    private double value;
}
