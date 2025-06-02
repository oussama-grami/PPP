package com.ppp.Ecopilot.Mappers.EventFootprint;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.EventFootprintDataDto;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.EventFootprintData;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class EventFootprintDataMapper {

    public EventFootprintData toEntity(EventFootprintDataDto dto) {
        if (dto == null) {
            return null;
        }

        EventFootprintData entity = EventFootprintData.builder()
                .id(dto.getId())
                .eventName(dto.getEventName())
                .eventType(dto.getEventType())
                .totalEmission(dto.getTotalEmission())
                .build();

        // Convert java.util.Date to java.time.LocalDateTime
        if (dto.getCreated_at() != null) {
            LocalDateTime createdDate = dto.getCreated_at()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            entity.setCreatedDate(createdDate);
        }


        return entity;
    }

    public EventFootprintDataDto toDto(EventFootprintData entity) {
        if (entity == null) {
            return null;
        }

        // Convert LocalDateTime to Date
        Date createdAtDate = null;
        if (entity.getCreatedDate() != null) {
            createdAtDate = Date.from(
                    entity.getCreatedDate().atZone(ZoneId.systemDefault()).toInstant()
            );
        }

        return EventFootprintDataDto.builder()
                .id(entity.getId())
                .eventName(entity.getEventName())
                .eventType(entity.getEventType())
                .totalEmission(entity.getTotalEmission())
                .created_at(createdAtDate)
                .build();
    }


}
