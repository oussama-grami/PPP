package com.ppp.Ecopilot.Mappers.EventFootprint;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.EventFootprintData;
import org.springframework.stereotype.Service;

@Service
public class CreateEventFootprintDataMapper {

    public EventFootprintData toEntity(CreateEventFootprintDataDto dto) {
        if (dto == null) {
            return null;
        }

        EventFootprintData entity = new EventFootprintData();

        entity.setAttendeesUsingTransport(dto.getAttendeesUsingTransport());
        entity.setAvgPowerPerDevice(dto.getAvgPowerPerDevice());
        entity.setDecorationMaterial(dto.getDecorationMaterial());
        entity.setDeviceNbr(dto.getDeviceNbr());
        entity.setDuration(dto.getDuration());
        entity.setEnergyUsageHours(dto.getEnergyUsageHours());
        entity.setEventName(dto.getEventName());
        entity.setEventType(dto.getEventType());
        entity.setLocation(dto.getLocation());
        entity.setMealType(dto.getMealType());
        entity.setNbrOfMeals(dto.getNbrOfMeals());
        entity.setParticipantsNbr(dto.getParticipantsNbr());
        entity.setPrintedMaterial(dto.getPrintedMaterial());
        entity.setTransportDistance(dto.getTransportDistance());
        entity.setTransportMode(dto.getTransportMode());
        entity.setVenueType(dto.getVenueType());


        return entity;
    }

    public CreateEventFootprintDataDto toDto(EventFootprintData entity) {
        if (entity == null) {
            return null;
        }

        return CreateEventFootprintDataDto.builder()
                .attendeesUsingTransport(entity.getAttendeesUsingTransport())
                .avgPowerPerDevice(entity.getAvgPowerPerDevice())
                .decorationMaterial(entity.getDecorationMaterial())
                .deviceNbr(entity.getDeviceNbr())
                .duration(entity.getDuration())
                .energyUsageHours(entity.getEnergyUsageHours())
                .eventName(entity.getEventName())
                .eventType(entity.getEventType())
                .location(entity.getLocation())
                .mealType(entity.getMealType())
                .nbrOfMeals(entity.getNbrOfMeals())
                .participantsNbr(entity.getParticipantsNbr())
                .printedMaterial(entity.getPrintedMaterial())
                .transportDistance(entity.getTransportDistance())
                .transportMode(entity.getTransportMode())
                .venueType(entity.getVenueType())
                .build();
    }
}
