package com.ppp.Ecopilot.Services.Implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Enums.Unit;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;
import com.ppp.Ecopilot.Models.EventPredictionRequest;
import com.ppp.Ecopilot.Services.CalculationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.List;

@Service
public class CalculationServiceImpl implements CalculationService {
    @Value("${flask.api.url}")
    private String baseUrl;
    public CompletableFuture<Double> calculateTotalEmissionFromModelAsync(CarbonFootprintModelRequest request) {
        ObjectMapper mapper = new ObjectMapper();
        HttpClient client = HttpClient.newHttpClient();

        Map<String, Object> wrapper = Map.of("parameters", request);
        String requestBody;
        try {
            requestBody = mapper.writeValueAsString(wrapper);
        } catch (JsonProcessingException e) {
            return CompletableFuture.failedFuture(new RuntimeException("Failed to serialize request", e));
        }

        HttpRequest postRequest = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "predict"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();
        System.out.println("Sending request to: " + postRequest.uri());
        System.out.println("Request Method: " + postRequest.method());
        System.out.println("Request Headers: " + postRequest.headers());
        System.out.println("Request Body: " + requestBody);
        return client.sendAsync(postRequest, HttpResponse.BodyHandlers.ofString())
                .thenApply(postResponse -> {
                    if (postResponse.statusCode() != 200) {
                        throw new RuntimeException("POST /predict failed (status " + postResponse.statusCode() + "): " + postResponse.body());
                    }

                    try {
                        return mapper.readTree(postResponse.body()).get("carbon_footprint_prediction").asDouble();
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse carbon_footprint_prediction", e);
                    }
                });
    }

    private CompletableFuture<HttpResponse<String>> failed(String msg, HttpResponse<String> response) {
        return CompletableFuture.failedFuture(
                new RuntimeException(msg + " (status " + response.statusCode() + "): " + response.body()));
    }


    @Override
    public CarbonFootprintModelRequest buildModelRequestFromEntity(CarbonFootprintData data) {
        return CarbonFootprintModelRequest.builder()
                .activitySector(data.getActivitySector())
                .country(data.getCountry())
                .numberOfFullTimeEmployees(data.getNumberOfFullTimeEmployees())
                .percentageOfTelework(data.getPercentageOfTelework())
                .annualConsumptionOfElectricity(data.getAnnualConsumptionOfElectricity())
                .annualConsumptionOfNaturalGas(data.getAnnualConsumptionOfNaturalGas())
                .annualConsumptionOfPropane(data.getAnnualConsumptionOfPropane())
                .annualConsumptionOfFuel(data.getAnnualConsumptionOfFuel())
                .annualConsumptionOfCoal(data.getAnnualConsumptionOfCoal())
                .annualConsumptionOfRefrigerant(data.getAnnualConsumptionOfRefrigerant())
                .annualConsumptionOfGPL(data.getAnnualConsumptionOfGPL())
                .fuelConsumptionOfGasoline(data.getFuelConsumptionOfGasoline())
                .fuelConsumptionOfDiesel(data.getFuelConsumptionOfDiesel())
                .consumptionOfLPG(data.getConsumptionOfLPG())
                .numberOfShortHaulRoundTrip(data.getNumberOfShortHaulRoundTrips())
                .numberOfMediumHaulRoundTrip(data.getNumberOfMediumHaulRoundTrips())
                .numberOfLongHaulRoundTrip(data.getNumberOfLongHaulRoundTrips())
                .tonsOfAirFreightLt3000(data.getTonsOfAirFreightShort())
                .tonsOfAirFreightGt3000(data.getTonsOfAirFreightLong())
                .tonsOfSeaFreightLt3000(data.getTonsOfSeaFreightShort())
                .tonsOfSeaFreightGt3000(data.getTonsOfSeaFreightLong())
                .expensesOfPaper(data.getExpensesOnPaper())
                .expensesOfSmallOfficeSupplies(data.getExpensesOnSmallOfficeSupplies())
                .builtAreaOfCompany(data.getBuiltAreaOfCompany())
                .numberOfLightDutyVehicles(data.getNumberOfLightDutyVehicles())
                .numberOfCommercialVehicles(data.getNumberOfCommercialVehicles())
                .numberOfHeavyVehicles(data.getNumberOfHeavyVehicles())
                .numberOfDesktopComputers(data.getNumberOfDesktopComputers())
                .numberOfLaptops(data.getNumberOfLaptops())
                .numberOfIndividualPrinters(data.getNumberOfIndividualPrinters())
                .numberOfServers(data.getNumberOfServers())
                .numberOfMultifunctionPrinters(data.getNumberOfMultifunctionPrinters())
                .numberOfFlatPanelScreens(data.getNumberOfFlatPanelScreens())
                .build();
    }

    public double fetchTotalEmissionsFromFlask(CreateEventFootprintDataDto dto) {
        EventPredictionRequest requestPayload = new EventPredictionRequest(
                dto.getDuration(),
                dto.getParticipantsNbr(),
                dto.getDeviceNbr(),
                dto.getAvgPowerPerDevice(),
                dto.getEnergyUsageHours(),
                dto.getTransportDistance(),
                dto.getAttendeesUsingTransport(),
                dto.getNbrOfMeals(),
                dto.getPrintedMaterial(),
                dto.getDecorationMaterial(),
                dto.getEventType(),
                dto.getVenueType(),
                dto.getLocation(),
                dto.getTransportMode(),
                dto.getMealType()
        );


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(Collections.singletonList(requestPayload), headers);

        String flaskUrl = baseUrl+"eventPredict";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Double> predictions = (List<Double>) response.getBody().get("predictions");
            return predictions.get(0);
        } else {
            throw new RuntimeException("Failed to fetch emission prediction from Flask API.");
        }
    }
}
