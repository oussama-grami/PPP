package com.ppp.Ecopilot.DTO.EventFootprintDTO;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class EventFootprintDataDto {
    private Long id;
    private double totalEmission;
    private String eventName;
    private String eventType;
    private Date created_at;
}
