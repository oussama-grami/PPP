package com.ppp.Ecopilot.DTO.CarbonFootprintHistory;// CarbonFootprintForecastResponse.java
import lombok.Data;
import java.util.List;

@Data
public class CarbonFootprintForecastResponse {
    private List<PredictedEntry> predicted_carbon_footprint_kgCO2;

    @Data
    public static class PredictedEntry {
        private double carbon_footprint_kgCO2;
        private int month;
        private int year;
    }
}