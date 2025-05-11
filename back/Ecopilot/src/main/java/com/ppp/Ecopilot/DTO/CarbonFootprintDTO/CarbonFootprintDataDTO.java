package com.ppp.Ecopilot.DTO.CarbonFootprintDTO;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@EqualsAndHashCode()
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CarbonFootprintDataDTO {
    private Date beginDate;
    private Date endDate;
    private String companyName;
    private String country;
    private String activitySector;
    private LocalDateTime createdDate;
    private Long id;

    private double totalEmissions;

    private Long companyOwnerId;
    private String companyOwnerName;
}
