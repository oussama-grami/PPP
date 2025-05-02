package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ppp.Ecopilot.Enums.CarburantType;
import com.ppp.Ecopilot.Enums.Unit;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@SuperBuilder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class CarbonFootprintData extends BaseEntity<Long> {
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String activitySector;
    @Column(nullable = false)
    private double aerienEmission;
    @Column(nullable = false)
    private double annualConsumptionOfCoal;
    @Column(nullable = false)
    private double annualConsumptionOfElectricity;
    @Column(nullable = false)
    private double annualConsumptionOfFuel;
    @Column(nullable = false)
    private double annualConsumptionOfGPL;
    @Column(nullable = false)
    private double annualConsumptionOfNaturalGas;
    @Column(nullable = false)
    private double annualConsumptionOfPropane;
    @Column(nullable = false)
    private double annualConsumptionOfRefrigerant;
    @Column(nullable = false)
    private Date beginDate;
    @Column(nullable = false)
    private double builtAreaOfCompany;
    @Column(nullable = false)
    private double carburantEmissions;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CarburantType carburantType;
    @Column(nullable = false)
    private double consomableEmissions;
    @Column(nullable = false)
    private double consumptionOfLPG;
    @Column(nullable = false)
    private double drivenDistance;
    @Column(nullable = false)
    private Date endDate;
    @Column(nullable = false)
    private double energyEmissions;
    @Column(nullable = false)
    private double expensesOnPaper;
    @Column(nullable = false)
    private double expensesOnSmallOfficeSupplies;
    @Column(nullable = false)
    private double freightEmission;
    @Column(nullable = false)
    private double fuelConsumptionOfDiesel;
    @Column(nullable = false)
    private double fuelConsumptionOfGasoline;
    @Column(nullable = false)
    private double immobilisationEmissions;
    @Column(nullable = false)
    private int numberOfCommercialVehicles;
    @Column(nullable = false)
    private int numberOfDesktopComputers;
    @Column(nullable = false)
    private int numberOfFlatPanelScreens;
    @Column(nullable = false)
    private int numberOfFullTimeEmployees;
    @Column(nullable = false)
    private int numberOfHeavyVehicles;
    @Column(nullable = false)
    private int numberOfIndividualPrinters;
    @Column(nullable = false)
    private int numberOfLaptops;
    @Column(nullable = false)
    private int numberOfLightDutyVehicles;
    @Column(nullable = false)
    private int numberOfLongHaulRoundTrips;
    @Column(nullable = false)
    private int numberOfMediumHaulRoundTrips;
    @Column(nullable = false)
    private int numberOfMultifunctionPrinters;
    @Column(nullable = false)
    private int numberOfServers;
    @Column(nullable = false)
    private int numberOfShortHaulRoundTrips;
    @Column(nullable = false)
    private int percentageOfTelework;
    @Column(nullable = false)
    private double tonsOfAirFreightLong;
    @Column(nullable = false)
    private double tonsOfAirFreightShort;
    @Column(nullable = false)
    private double tonsOfSeaFreightLong;
    @Column(nullable = false)
    private double tonsOfSeaFreightShort;
    @Column(nullable = false)
    private double totalEmissions;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Unit unitFourniture;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Unit unitPaper;
    @Column(nullable = false)
    private double vehicleFuelEfficiency;
    @ManyToOne
    @JoinColumn(name = "companyOwner_id")
    private CompanyOwner companyOwner;

}