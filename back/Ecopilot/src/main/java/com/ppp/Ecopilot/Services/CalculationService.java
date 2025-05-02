package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Enums.Unit;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;

import java.util.concurrent.CompletableFuture;

public interface CalculationService {
    public CompletableFuture<Double> calculateTotalEmissionFromModelAsync(CarbonFootprintModelRequest request);

    public CarbonFootprintModelRequest buildModelRequestFromEntity(CarbonFootprintData data);

    public double fetchTotalEmissionsFromFlask(CreateEventFootprintDataDto dto) ;

    }
