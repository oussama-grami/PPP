package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.DTO.EventFootprintDTO.EventFootprintDataDto;
import com.ppp.Ecopilot.Entities.EventFootprintData;

import java.util.List;

public interface EventFootprintDataService extends CRUDService<EventFootprintData, Long> {

    void create(CreateEventFootprintDataDto createDto);

    List<EventFootprintDataDto> getAllEventFootprints();

    EventFootprintDataDto getEventFootprintById(Long id);

    List<EventFootprintDataDto> getEventFootprintsByCompanyOwner(Long companyOwnerId);

    void deleteById(Long id);
}
