package com.ppp.Ecopilot.Mappers;


import com.ppp.Ecopilot.DTO.EsgOptionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
public class EsgOptionMapper implements EntityMapper<EsgOption, EsgOptionDTO> {

    @Override
    public EsgOption toEntity(EsgOptionDTO dto) {
        if (dto == null) {
            return null;
        }

       EsgOption entity  = new EsgOption();
        entity.setId(dto.getId());
        entity.setText(dto.getText());
        entity.setScore(dto.getScore());
        return entity;
    }

    @Override
    public EsgOptionDTO toDto(EsgOption entity) {
        if (entity == null) {
            return null;
        }

        EsgOptionDTO dto = new EsgOptionDTO();
        dto.setId(entity.getId());
        dto.setText(entity.getText());
        dto.setScore(entity.getScore());
        return dto;
    }
}
