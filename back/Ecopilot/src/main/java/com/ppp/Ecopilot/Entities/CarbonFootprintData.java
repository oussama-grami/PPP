package com.ppp.Ecopilot.Entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ppp.Ecopilot.Enums.CarburantType;
import com.ppp.Ecopilot.Enums.Unit;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
/**
 * The CarbonFootprintData class represents the carbon footprint data of a company.
 * It includes various fields related to the company's activities, emissions, and consumption.
 * The class uses Lombok annotations for boilerplate code generation.
 */
@Entity
public class CarbonFootprintData extends BaseEntity<Long> {

    private String activitySector;
    private double AerienEmission;
    private double annualConsumptionOfCoal;
    private double annualConsumptionOfElectricity;
    private double annualConsumptionOfFuel;
    private double annualConsumptionOfGPL;
    private double annualConsumptionOfNaturalGas;
    private double annualConsumptionOfPropane;
    private double annualConsumptionOfRefrigerant;
    private Date beginDate;
    private double builtAreaOfCompany;
    private double carburantEmissions;
    @Enumerated(EnumType.STRING)
    private CarburantType carburantType;
    private double consomableEmissions;
    private double consumptionOfLPG;
    private double DrivenDistance;
    private Date endDate;
    private double energyEmissions;
    private double expensesOnPaper;
    private double expensesOnSmallOfficeSupplies;
    private double freightEmission;
    private double fuelConsumptionOfDiesel;
    private double fuelConsumptionOfGasoline;
    private double immobilisationEmissions;
    private int numberOfCommercialVehicles;
    private int numberOfDesktopComputers;
    private int numberOfFlatPanelScreens;
    private int numberOfFullTimeEmployees;
    private int numberOfHeavyVehicles;
    private int numberOfIndividualPrinters;
    private int numberOfLaptops;
    private int numberOfLightDutyVehicles;
    private int numberOfLongHaulRoundTrips;
    private int numberOfMediumHaulRoundTrips;
    private int numberOfMultifunctionPrinters;
    private int numberOfServers;
    private int numberOfShortHaulRoundTrips;
    private int percentageOfTelework;
    private double TonsOfAirFreightLong;
    private double TonsOfAirFreightShort;
    private double TonsOfSeaFreightLong;
    private double TonsOfSeaFreightShort;
    private double totalEmissions;
    @Enumerated(EnumType.STRING)
    private Unit unitFourniture;
    @Enumerated(EnumType.STRING)
    private Unit unitPaper;
    private double vehicleFuelEfficiecy;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;
}