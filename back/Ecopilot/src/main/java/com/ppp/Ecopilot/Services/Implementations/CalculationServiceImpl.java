package com.ppp.Ecopilot.Services.Implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Enums.Unit;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;
import com.ppp.Ecopilot.Services.CalculationService;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
@Service
public class CalculationServiceImpl implements CalculationService {

    public CompletableFuture<Double> calculateTotalEmissionFromModelAsync(CarbonFootprintModelRequest request) {
        String baseUrl = "http://localhost:5000";
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
                .uri(URI.create(baseUrl + "/predict"))
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

    // 1. Carburant emissions
    public double calculateCarburantEmissions(CarbonFootprintData data) {
        double emDiesel = data.getFuelConsumptionOfDiesel() * 2.7 / 1000;
        double emGasoline = data.getFuelConsumptionOfGasoline() * 2.7 / 1000;
        double emLpg = data.getConsumptionOfLPG() * 3.45 / 1000;
        double emKm = 0.0;

        if (data.getCarburantType() != null) {
            double efficiency = data.getVehicleFuelEfficiency();
            switch (data.getCarburantType()) {
                case DIESEL -> emKm = data.getDrivenDistance() * efficiency * 2.7 / 1000;
                case GASOLINE -> emKm = data.getDrivenDistance() * efficiency * 2.7 / 1000;
                case LPG -> emKm = data.getDrivenDistance() * efficiency * 3.45 / 1000;
            }
        }

        return emDiesel + emGasoline + emLpg + emKm;
    }


    // 2. Energy emissions
    public double calculateEnergyEmissions(CarbonFootprintData data) {
        double EF = 0.4; // Example fixed EF, ideally fetch based on country
        double emTelework = data.getPercentageOfTelework() / 100.0 * EF / 1000.0 * 223 * 1.4 * data.getNumberOfFullTimeEmployees();
        double emElectricity = data.getAnnualConsumptionOfElectricity() * EF / 1000.0;
        double emGas = data.getAnnualConsumptionOfNaturalGas() * 0.243 / 1000.0;
        double emPropane = data.getAnnualConsumptionOfPropane() * 0.263 / 1000.0;
        double emFuel = data.getAnnualConsumptionOfFuel() * 3.332 / 1000.0;
        double emCoal = data.getAnnualConsumptionOfCoal() * 0.284 / 1000.0;
        double emRefrigerant = data.getAnnualConsumptionOfRefrigerant() * 26 / 1000.0;
        double emGPL = data.getAnnualConsumptionOfGPL() * 3.45 / 1000.0;

        return emTelework + emElectricity + emGas + emPropane + emFuel + emCoal + emRefrigerant + emGPL;
    }

    // 3. Immobilisation emissions
    public double calculateImmobilisationEmissions(CarbonFootprintData data) {
        double emScreen = (data.getNumberOfFlatPanelScreens() / 3.0) * 205 / 1000.0;
        double emLaptop = (data.getNumberOfLaptops() / 3.0) * 156 / 1000.0;
        double emSurface = (data.getBuiltAreaOfCompany() / 20.0) * 650 / 1000.0;
        double emPrinterIndiv = (data.getNumberOfIndividualPrinters() / 3.0) * 88.2 / 1000.0;
        double emPrinterMulti = (data.getNumberOfMultifunctionPrinters() / 3.0) * 197 / 1000.0;
        double emDesktop = (data.getNumberOfDesktopComputers() / 3.0) * 678 / 1000.0;
        double emServers = (data.getNumberOfServers() / 3.0) * 600 / 1000.0;
        double emLight = data.getNumberOfLightDutyVehicles() * 642 / 1000.0;
        double emHeavy = data.getNumberOfHeavyVehicles() * 4492 / 1000.0;
        double emComm = data.getNumberOfCommercialVehicles() * 1220 / 1000.0;

        return emScreen + emLaptop + emSurface + emPrinterIndiv + emPrinterMulti + emDesktop + emServers + emLight + emHeavy + emComm;
    }

    // 4. Consommable emissions (paper & fournitures)
    public double calculateConsomableEmissions(CarbonFootprintData data) {
        double efPaper = getEmissionFactorForPaper(data.getUnitPaper());
        double efFourniture = getEmissionFactorForFourniture(data.getUnitFourniture());

        return (data.getExpensesOnPaper() * efPaper + data.getExpensesOnSmallOfficeSupplies() * efFourniture) / 1000.0;
    }

    // 5. Freight emissions
    public double calculateFreightEmissions(CarbonFootprintData data) {
        double emAirShort = data.getTonsOfAirFreightShort() * 1.89 / 1000.0;
        double emAirLong = data.getTonsOfAirFreightLong() * 2.1 / 1000.0;
        double emSeaShort = data.getTonsOfSeaFreightShort() * 0.0141 / 1000.0;
        double emSeaLong = data.getTonsOfSeaFreightLong() * 0.0184 / 1000.0;

        return emAirShort + emAirLong + emSeaShort + emSeaLong;
    }

    // 6. Aérien emissions (personnel déplacement)
    public double calculateAerienEmissions(CarbonFootprintData data) {
        double emShort = data.getNumberOfShortHaulRoundTrips() * 0.239 * 1500 / 1000.0;
        double emMedium = data.getNumberOfMediumHaulRoundTrips() * 0.256 * 4500 / 1000.0;
        double emLong = data.getNumberOfLongHaulRoundTrips() * 0.216 * 6000 / 1000.0;

        return emShort + emMedium + emLong;
    }

    // === Unit-specific factors ===
    public double getEmissionFactorForPaper(Unit unit) {
        return switch (unit) {
            case DOLLAR -> 1.2;
            case EURO -> 1.1;
            case TUNISIAN_DINAR -> 0.4;
            default -> 1.0;
        };
    }

    public double getEmissionFactorForFourniture(Unit unit) {
        return switch (unit) {
            case DOLLAR -> 5.0;
            case EURO -> 4.7;
            case TUNISIAN_DINAR -> 2.0;
            default -> 4.0;
        };
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



}
