package com.ppp.Ecopilot.DTO.CarbonFootprintDTO;

import com.ppp.Ecopilot.Enums.CarburantType;
import com.ppp.Ecopilot.Enums.Unit;
import lombok.*;
import lombok.experimental.SuperBuilder;
import jakarta.validation.constraints.*;

import java.util.Date;

@Data
@EqualsAndHashCode()
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CarbonFootprintCreateDTO {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Activity sector is required")
    private String activitySector;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfCoal;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfElectricity;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfFuel;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfGPL;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfNaturalGas;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfPropane;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double annualConsumptionOfRefrigerant;

    @NotNull(message = "Begin date is required")
        private Date beginDate;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double builtAreaOfCompany;

    private CarburantType carburantType;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double consumptionOfLPG;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double drivenDistance;

    @NotNull(message = "End date is required")
    private Date endDate;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double expensesOnPaper;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double expensesOnSmallOfficeSupplies;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double fuelConsumptionOfDiesel;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double fuelConsumptionOfGasoline;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfCommercialVehicles;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfDesktopComputers;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfFlatPanelScreens;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfFullTimeEmployees;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfHeavyVehicles;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfIndividualPrinters;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfLaptops;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfLightDutyVehicles;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfLongHaulRoundTrips;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfMediumHaulRoundTrips;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfMultifunctionPrinters;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfServers;

    @PositiveOrZero(message = "Value must be positive or zero")
    private int numberOfShortHaulRoundTrips;

    @Min(value = 0, message = "Percentage must be between 0 and 100")
    @Max(value = 100, message = "Percentage must be between 0 and 100")
    private int percentageOfTelework;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double tonsOfAirFreightLong;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double tonsOfAirFreightShort;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double tonsOfSeaFreightLong;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double tonsOfSeaFreightShort;

    @PositiveOrZero(message = "Value must be positive or zero")
    private double totalEmissions;

    private Unit unitFourniture;
    private Unit unitPaper;

    @Positive(message = "Value must be positive")
    private double vehicleFuelEfficiency;

}
