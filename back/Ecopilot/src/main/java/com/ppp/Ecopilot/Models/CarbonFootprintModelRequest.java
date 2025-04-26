package com.ppp.Ecopilot.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarbonFootprintModelRequest {

    @JsonProperty("country")
    private String country;

    @JsonProperty("activity_sector")
    private String activitySector;

    @JsonProperty("number_of_full_time_employees")
    private int numberOfFullTimeEmployees;

    @JsonProperty("percentage_of_telework")
    private double percentageOfTelework;

    @JsonProperty("annual_consumption_of_electricity")
    private double annualConsumptionOfElectricity;

    @JsonProperty("annual_consumption_of_natural_gas")
    private double annualConsumptionOfNaturalGas;

    @JsonProperty("annual_consumption_of_propane")
    private double annualConsumptionOfPropane;

    @JsonProperty("annual_consumption_of_fuel")
    private double annualConsumptionOfFuel;

    @JsonProperty("annual_consumption_of_coal")
    private double annualConsumptionOfCoal;

    @JsonProperty("annual_consumption_of_refrigerant")
    private double annualConsumptionOfRefrigerant;

    @JsonProperty("annual_consumption_of_GPL")
    private double annualConsumptionOfGPL;

    @JsonProperty("fuel_consumption_of_gasoline")
    private double fuelConsumptionOfGasoline;

    @JsonProperty("fuel_consumption_of_diesel")
    private double fuelConsumptionOfDiesel;

    @JsonProperty("consumption_of_LPG")
    private double consumptionOfLPG;

    @JsonProperty("number_of_short_haul_round_trip")
    private int numberOfShortHaulRoundTrip;

    @JsonProperty("number_of_medium_haul_round_trip")
    private int numberOfMediumHaulRoundTrip;

    @JsonProperty("number_of_long_haul_round_trip")
    private int numberOfLongHaulRoundTrip;

    @JsonProperty("tons_of_air_freight_lt_3000")
    private double tonsOfAirFreightLt3000;

    @JsonProperty("tons_of_air_freight_gt_3000")
    private double tonsOfAirFreightGt3000;

    @JsonProperty("tons_of_sea_freight_lt_3000")
    private double tonsOfSeaFreightLt3000;

    @JsonProperty("tons_of_sea_freight_gt_3000")
    private double tonsOfSeaFreightGt3000;

    @JsonProperty("expenses_of_paper")
    private double expensesOfPaper;

    @JsonProperty("expenses_of_small_office_supplies")
    private double expensesOfSmallOfficeSupplies;

    @JsonProperty("built_area_of_company")
    private double builtAreaOfCompany;

    @JsonProperty("number_of_light_duty_vehicles")
    private int numberOfLightDutyVehicles;

    @JsonProperty("number_of_commercial_vehicles")
    private int numberOfCommercialVehicles;

    @JsonProperty("number_of_heavy_vehicles")
    private int numberOfHeavyVehicles;

    @JsonProperty("number_of_desktop_computers")
    private int numberOfDesktopComputers;

    @JsonProperty("number_of_laptops")
    private int numberOfLaptops;

    @JsonProperty("number_of_individual_printers")
    private int numberOfIndividualPrinters;

    @JsonProperty("number_of_servers")
    private int numberOfServers;

    @JsonProperty("number_of_multifunction_printers")
    private int numberOfMultifunctionPrinters;

    @JsonProperty("number_of_flat_panel_screens")
    private int numberOfFlatPanelScreens;


}