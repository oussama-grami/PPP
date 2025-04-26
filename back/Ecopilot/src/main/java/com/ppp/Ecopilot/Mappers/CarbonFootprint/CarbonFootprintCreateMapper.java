package com.ppp.Ecopilot.Mappers.CarbonFootprint;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintCreateDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Enums.CarburantType;
import com.ppp.Ecopilot.Enums.Unit;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CarbonFootprintCreateMapper {

    public CarbonFootprintData toEntity(CarbonFootprintCreateDTO dto) {
        if (dto == null) {
            return null;
        }

        CarbonFootprintData entity = new CarbonFootprintData();

        // Map all fields from DTO to Entity
        entity.setCountry(dto.getCountry());
        entity.setActivitySector(dto.getActivitySector());
        entity.setAnnualConsumptionOfCoal(dto.getAnnualConsumptionOfCoal());
        entity.setAnnualConsumptionOfElectricity(dto.getAnnualConsumptionOfElectricity());
        entity.setAnnualConsumptionOfFuel(dto.getAnnualConsumptionOfFuel());
        entity.setAnnualConsumptionOfGPL(dto.getAnnualConsumptionOfGPL());
        entity.setAnnualConsumptionOfNaturalGas(dto.getAnnualConsumptionOfNaturalGas());
        entity.setAnnualConsumptionOfPropane(dto.getAnnualConsumptionOfPropane());
        entity.setAnnualConsumptionOfRefrigerant(dto.getAnnualConsumptionOfRefrigerant());
        entity.setBuiltAreaOfCompany(dto.getBuiltAreaOfCompany());
        entity.setConsumptionOfLPG(dto.getConsumptionOfLPG());
        entity.setDrivenDistance(dto.getDrivenDistance());
        entity.setExpensesOnPaper(dto.getExpensesOnPaper());
        entity.setExpensesOnSmallOfficeSupplies(dto.getExpensesOnSmallOfficeSupplies());
        entity.setFuelConsumptionOfDiesel(dto.getFuelConsumptionOfDiesel());
        entity.setFuelConsumptionOfGasoline(dto.getFuelConsumptionOfGasoline());
        entity.setNumberOfCommercialVehicles(dto.getNumberOfCommercialVehicles());
        entity.setNumberOfDesktopComputers(dto.getNumberOfDesktopComputers());
        entity.setNumberOfFlatPanelScreens(dto.getNumberOfFlatPanelScreens());
        entity.setNumberOfFullTimeEmployees(dto.getNumberOfFullTimeEmployees());
        entity.setNumberOfHeavyVehicles(dto.getNumberOfHeavyVehicles());
        entity.setNumberOfIndividualPrinters(dto.getNumberOfIndividualPrinters());
        entity.setNumberOfLaptops(dto.getNumberOfLaptops());
        entity.setNumberOfLightDutyVehicles(dto.getNumberOfLightDutyVehicles());
        entity.setNumberOfLongHaulRoundTrips(dto.getNumberOfLongHaulRoundTrips());
        entity.setNumberOfMediumHaulRoundTrips(dto.getNumberOfMediumHaulRoundTrips());
        entity.setNumberOfMultifunctionPrinters(dto.getNumberOfMultifunctionPrinters());
        entity.setNumberOfServers(dto.getNumberOfServers());
        entity.setNumberOfShortHaulRoundTrips(dto.getNumberOfShortHaulRoundTrips());
        entity.setPercentageOfTelework(dto.getPercentageOfTelework());
        entity.setTonsOfAirFreightLong(dto.getTonsOfAirFreightLong());
        entity.setTonsOfAirFreightShort(dto.getTonsOfAirFreightShort());
        entity.setTonsOfSeaFreightLong(dto.getTonsOfSeaFreightLong());
        entity.setTonsOfSeaFreightShort(dto.getTonsOfSeaFreightShort());
        entity.setVehicleFuelEfficiency(dto.getVehicleFuelEfficiency());

        // Handle company owner reference
        if (entity.getCompanyOwner() != null) {
            dto.setCompanyOwnerId(entity.getCompanyOwner().getId());
        }

        // Handle special fields
        if (dto.getBeginDate() != null) {
            entity.setBeginDate(new Date(dto.getBeginDate().getTime()));
        }
        if (dto.getEndDate() != null) {
            entity.setEndDate(new Date(dto.getEndDate().getTime()));
        }
        if (dto.getCarburantType() != null) {
            entity.setCarburantType(dto.getCarburantType());
        }
        if (dto.getUnitFourniture() != null) {
            entity.setUnitFourniture(dto.getUnitFourniture());
        }
        if (dto.getUnitPaper() != null) {
            entity.setUnitPaper(dto.getUnitPaper());
        }

        return entity;
    }

    public CarbonFootprintCreateDTO toDto(CarbonFootprintData entity) {
        if (entity == null) {
            return null;
        }

        CarbonFootprintCreateDTO dto = new CarbonFootprintCreateDTO();

        // Map all fields from Entity to DTO
        dto.setCountry(entity.getCountry());
        dto.setActivitySector(entity.getActivitySector());
        dto.setAnnualConsumptionOfCoal(entity.getAnnualConsumptionOfCoal());
        dto.setAnnualConsumptionOfElectricity(entity.getAnnualConsumptionOfElectricity());
        dto.setAnnualConsumptionOfFuel(entity.getAnnualConsumptionOfFuel());
        dto.setAnnualConsumptionOfGPL(entity.getAnnualConsumptionOfGPL());
        dto.setAnnualConsumptionOfNaturalGas(entity.getAnnualConsumptionOfNaturalGas());
        dto.setAnnualConsumptionOfPropane(entity.getAnnualConsumptionOfPropane());
        dto.setAnnualConsumptionOfRefrigerant(entity.getAnnualConsumptionOfRefrigerant());
        dto.setBuiltAreaOfCompany(entity.getBuiltAreaOfCompany());
        dto.setConsumptionOfLPG(entity.getConsumptionOfLPG());
        dto.setDrivenDistance(entity.getDrivenDistance());
        dto.setExpensesOnPaper(entity.getExpensesOnPaper());
        dto.setExpensesOnSmallOfficeSupplies(entity.getExpensesOnSmallOfficeSupplies());
        dto.setFuelConsumptionOfDiesel(entity.getFuelConsumptionOfDiesel());
        dto.setFuelConsumptionOfGasoline(entity.getFuelConsumptionOfGasoline());
        dto.setNumberOfCommercialVehicles(entity.getNumberOfCommercialVehicles());
        dto.setNumberOfDesktopComputers(entity.getNumberOfDesktopComputers());
        dto.setNumberOfFlatPanelScreens(entity.getNumberOfFlatPanelScreens());
        dto.setNumberOfFullTimeEmployees(entity.getNumberOfFullTimeEmployees());
        dto.setNumberOfHeavyVehicles(entity.getNumberOfHeavyVehicles());
        dto.setNumberOfIndividualPrinters(entity.getNumberOfIndividualPrinters());
        dto.setNumberOfLaptops(entity.getNumberOfLaptops());
        dto.setNumberOfLightDutyVehicles(entity.getNumberOfLightDutyVehicles());
        dto.setNumberOfLongHaulRoundTrips(entity.getNumberOfLongHaulRoundTrips());
        dto.setNumberOfMediumHaulRoundTrips(entity.getNumberOfMediumHaulRoundTrips());
        dto.setNumberOfMultifunctionPrinters(entity.getNumberOfMultifunctionPrinters());
        dto.setNumberOfServers(entity.getNumberOfServers());
        dto.setNumberOfShortHaulRoundTrips(entity.getNumberOfShortHaulRoundTrips());
        dto.setPercentageOfTelework(entity.getPercentageOfTelework());
        dto.setTonsOfAirFreightLong(entity.getTonsOfAirFreightLong());
        dto.setTonsOfAirFreightShort(entity.getTonsOfAirFreightShort());
        dto.setTonsOfSeaFreightLong(entity.getTonsOfSeaFreightLong());
        dto.setTonsOfSeaFreightShort(entity.getTonsOfSeaFreightShort());
        dto.setVehicleFuelEfficiency(entity.getVehicleFuelEfficiency());

        // Handle company owner reference
        if (dto.getCompanyOwnerId() != null) {
            CompanyOwner companyOwner = new CompanyOwner();
            companyOwner.setId(dto.getCompanyOwnerId());
            entity.setCompanyOwner(companyOwner);
        }

        // Handle special fields
        if (entity.getBeginDate() != null) {
            dto.setBeginDate(new Date(entity.getBeginDate().getTime()));
        }
        if (entity.getEndDate() != null) {
            dto.setEndDate(new Date(entity.getEndDate().getTime()));
        }
        if (entity.getCarburantType() != null) {
            dto.setCarburantType(entity.getCarburantType());
        }
        if (entity.getUnitFourniture() != null) {
            dto.setUnitFourniture(entity.getUnitFourniture());
        }
        if (entity.getUnitPaper() != null) {
            dto.setUnitPaper(entity.getUnitPaper());
        }

        return dto;
    }
    public CarbonFootprintData toEntityWithOwner(CarbonFootprintCreateDTO dto, CompanyOwner owner) {
        CarbonFootprintData entity = toEntity(dto);
        entity.setCompanyOwner(owner);
        entity.setAerienEmission(0);
        entity.setCarburantEmissions(0);
        entity.setConsomableEmissions(0);
        entity.setEnergyEmissions(0);
        entity.setFreightEmission(0);
        entity.setImmobilisationEmissions(0);
        entity.setTotalEmissions(0);

        return entity;
    }

}