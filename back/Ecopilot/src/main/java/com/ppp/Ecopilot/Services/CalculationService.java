package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Enums.Unit;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;

import java.util.concurrent.CompletableFuture;

public interface CalculationService {
    public CompletableFuture<Double> calculateTotalEmissionFromModelAsync(CarbonFootprintModelRequest request);

    public double calculateCarburantEmissions(CarbonFootprintData data);

    public double calculateEnergyEmissions(CarbonFootprintData data);

    public double calculateImmobilisationEmissions(CarbonFootprintData data);

    public double calculateConsomableEmissions(CarbonFootprintData data);

    public double calculateFreightEmissions(CarbonFootprintData data);

    public double calculateAerienEmissions(CarbonFootprintData data);

    public CarbonFootprintModelRequest buildModelRequestFromEntity(CarbonFootprintData data);

    public double fetchTotalEmissionsFromFlask(CreateEventFootprintDataDto dto) ;

    }
