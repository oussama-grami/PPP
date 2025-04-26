package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import org.springframework.stereotype.Service;


@Service
public class CarbonHistoryMapper {

    public CarbonFootprintHistoryDTO toDto(CarbonFootprintHistory entity) {
        return new CarbonFootprintHistoryDTO(entity.getId(),entity.getDate(), entity.isPredicted(), entity.getValue());
    }


    public CarbonFootprintHistory toEntity(CreateCarbonFootprintHistoryDTO dto){
        CarbonFootprintHistory entity = new CarbonFootprintHistory();
        entity.setDate(dto.getDate());
        entity.setPredicted(dto.isPredicted());
        entity.setValue(dto.getValue());
        return entity;
    }
}
