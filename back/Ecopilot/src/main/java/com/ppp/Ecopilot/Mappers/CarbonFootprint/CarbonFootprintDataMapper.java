package com.ppp.Ecopilot.Mappers.CarbonFootprint;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintDataDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class CarbonFootprintDataMapper implements EntityMapper<CarbonFootprintData, CarbonFootprintDataDTO> {

    @Override
    public CarbonFootprintDataDTO toDto(CarbonFootprintData entity) {
        CarbonFootprintDataDTO dto = new CarbonFootprintDataDTO();

        dto.setBeginDate(entity.getBeginDate());
        dto.setEndDate(entity.getEndDate());
        dto.setCreatedDate(entity.getCreatedDate());

        dto.setCarburantEmissions(entity.getCarburantEmissions());
        dto.setEnergyEmissions(entity.getEnergyEmissions());
        dto.setImmobilisationEmissions(entity.getImmobilisationEmissions());
        dto.setConsomableEmissions(entity.getConsomableEmissions());
        dto.setFreightEmission(entity.getFreightEmission());
        dto.setAerienEmission(entity.getAerienEmission());

        dto.setTotalEmissions(entity.getTotalEmissions());

        if (entity.getCompanyOwner() != null) {
            dto.setCompanyOwnerId(entity.getCompanyOwner().getId());
            dto.setCompanyOwnerName(entity.getCompanyOwner().getCompanyName());
        }

        return dto;
    }

    @Override
    public CarbonFootprintData toEntity(CarbonFootprintDataDTO dto) {
        CarbonFootprintData entity = new CarbonFootprintData();

        // Optional: Only set fields needed for entity creation — or skip if handled elsewhere
        entity.setBeginDate(dto.getBeginDate());
        entity.setEndDate(dto.getEndDate());

        entity.setCarburantEmissions(dto.getCarburantEmissions());
        entity.setEnergyEmissions(dto.getEnergyEmissions());
        entity.setImmobilisationEmissions(dto.getImmobilisationEmissions());
        entity.setConsomableEmissions(dto.getConsomableEmissions());
        entity.setFreightEmission(dto.getFreightEmission());
        entity.setAerienEmission(dto.getAerienEmission());

        entity.setTotalEmissions(dto.getTotalEmissions());

        return entity;
    }

    public CarbonFootprintData toEntityWithOwner(CarbonFootprintDataDTO dto, CompanyOwner owner) {
        CarbonFootprintData entity = toEntity(dto);
        entity.setCompanyOwner(owner);
        return entity;
    }
}
