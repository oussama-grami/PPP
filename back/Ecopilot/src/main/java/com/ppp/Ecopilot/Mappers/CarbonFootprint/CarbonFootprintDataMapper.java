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

        dto.setId(entity.getId());
        dto.setBeginDate(entity.getBeginDate());
        dto.setEndDate(entity.getEndDate());
        dto.setCreatedDate(entity.getCreatedDate());

        dto.setCompanyName(entity.getCompanyName());
        dto.setCountry(entity.getCountry());
        dto.setActivitySector(entity.getActivitySector());

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

        entity.setId(dto.getId());
        entity.setBeginDate(dto.getBeginDate());
        entity.setEndDate(dto.getEndDate());
        entity.setCreatedDate(dto.getCreatedDate());

        entity.setCompanyName(dto.getCompanyName());
        entity.setCountry(dto.getCountry());
        entity.setActivitySector(dto.getActivitySector());

        entity.setTotalEmissions(dto.getTotalEmissions());

        return entity;
    }

    public CarbonFootprintData toEntityWithOwner(CarbonFootprintDataDTO dto, CompanyOwner owner) {
        CarbonFootprintData entity = toEntity(dto);
        entity.setCompanyOwner(owner);
        return entity;
    }
}
