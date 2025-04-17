package com.ppp.Ecopilot.DTO.CarbonFootprintHistory;// CarbonFootprintForecastRequest.java
import lombok.Data;
import java.util.List;

@Data
public class CarbonFootprintForecastRequest {
    private List<Integer> year;
    private List<Integer> month;
    private List<Double> carbon_footprint_kgCO2;
}