package com.ppp.Ecopilot.DTO.CarbonFootprintHistory;


import lombok.Data;

import java.time.YearMonth;
@Data
public class InterpolationRequestDTO {
    private YearMonth startDate;
    private YearMonth endDate;
    private double totalValue;
    private Long companyOwnerId;


}