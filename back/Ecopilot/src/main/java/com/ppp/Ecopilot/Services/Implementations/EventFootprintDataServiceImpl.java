package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.EventFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.DTO.EventFootprintDTO.EventFootprintDataDto;
import com.ppp.Ecopilot.Mappers.EventFootprint.CreateEventFootprintDataMapper;
import com.ppp.Ecopilot.Mappers.EventFootprint.EventFootprintDataMapper;
import com.ppp.Ecopilot.Repositories.EventFootprintDataRepo;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Services.CalculationService;
import com.ppp.Ecopilot.Services.EventFootprintDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EventFootprintDataServiceImpl extends AbstractCrudService<EventFootprintData, Long> implements EventFootprintDataService {

    private final EventFootprintDataRepo eventFootprintDataRepository;
    private final CompanyOwnerRepo companyOwnerRepository;
    private final EventFootprintDataMapper eventFootprintDataMapper;
    private final CreateEventFootprintDataMapper createEventFootprintDataMapper;
    private final CalculationService calculationService;

    @Override
    public void create(CreateEventFootprintDataDto createDto) {
        CompanyOwner companyOwner = companyOwnerRepository.findById(createDto.getCompanyOwnerId())
                .orElseThrow(() -> new RuntimeException("CompanyOwner not found"));

        EventFootprintData entity = createEventFootprintDataMapper.toEntity(createDto);
        entity.setCompanyOwner(companyOwner);


        double totalEmissions = calculationService.fetchTotalEmissionsFromFlask(createDto);
        entity.setTotalEmission(totalEmissions);
        System.out.println("totalEmissions: " + totalEmissions);
        eventFootprintDataRepository.save(entity);
    }


    @Override
    public List<EventFootprintDataDto> getAllEventFootprints() {
        return eventFootprintDataRepository.findAll()
                .stream()
                .map(eventFootprintDataMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public EventFootprintDataDto getEventFootprintById(Long id) {
        EventFootprintData entity = eventFootprintDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EventFootprintData not found"));
        return eventFootprintDataMapper.toDto(entity);
    }

    @Override
    public List<EventFootprintDataDto> getEventFootprintsByCompanyOwner(Long companyOwnerId) {
        CompanyOwner companyOwner = companyOwnerRepository.findById(companyOwnerId)
                .orElseThrow(() -> new RuntimeException("CompanyOwner not found"));

        return eventFootprintDataRepository.findByCompanyOwner(companyOwner)
                .stream()
                .map(eventFootprintDataMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        if (!eventFootprintDataRepository.existsById(id)) {
            throw new RuntimeException("EventFootprintData not found");
        }
        eventFootprintDataRepository.deleteById(id);
    }

    @Override
    protected JpaRepository<EventFootprintData, Long> getRepository() {
        return eventFootprintDataRepository;
    }

    @Override
    protected Class<EventFootprintData> getEntityClass() {
        return EventFootprintData.class;
    }
}
