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
public class CarbonFootprintDataDTO  {
    private Date beginDate;
    private Date endDate;
    private LocalDateTime createdDate;

    private double carburantEmissions;
    private double energyEmissions;
    private double immobilisationEmissions;
    private double consomableEmissions;
    private double freightEmission;
    private double aerienEmission;

    private double totalEmissions;

    private Long companyOwnerId;
    private String companyOwnerName;
}