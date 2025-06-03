package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintCreateDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintDataDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;

import com.ppp.Ecopilot.Mappers.CarbonFootprint.CarbonFootprintCreateMapper;
import com.ppp.Ecopilot.Mappers.CarbonFootprint.CarbonFootprintDataMapper;
import com.ppp.Ecopilot.Repositories.CarbonFootprintDataRepo;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Services.AuthService;
import com.ppp.Ecopilot.Services.CalculationService;
import com.ppp.Ecopilot.Services.CarbonFootprintDataService;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarbonFootprintDataServiceImpl
        extends AbstractCrudService<CarbonFootprintData, Long>
        implements CarbonFootprintDataService {

    private final CarbonFootprintDataRepo repository;
    private final CompanyOwnerRepo companyOwnerRepository;
    private final CarbonFootprintDataMapper dataMapper;
    private final CarbonFootprintCreateMapper createMapper;
    private final CalculationService calculationService;
    private final CarbonFootprintHistoryService carbonFootprintHistoryService;
    private final AuthService authService;

    // Base repository provider for generic CRUD
    @Override
    protected JpaRepository<CarbonFootprintData, Long> getRepository() {
        return repository;
    }

    @Override
    protected Class<CarbonFootprintData> getEntityClass() {
        return CarbonFootprintData.class;
    }

    private YearMonth convertToYearMonth(Date date) {
        return YearMonth.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
    }


    @Override
    public CarbonFootprintData saveData(CarbonFootprintCreateDTO dto) {
        CompanyOwner companyOwner = authService.getCurrentCompanyOwner();

        // Step 1: Convert DTO to entity
        CarbonFootprintData entity = createMapper.toEntity(dto);
        entity.setCompanyOwner(companyOwner);

        // Step 2: Build model request and calculate total emission
        CarbonFootprintModelRequest modelRequest = calculationService.buildModelRequestFromEntity(entity);
        CompletableFuture<Double> totalEmission = calculationService.calculateTotalEmissionFromModelAsync(modelRequest);
        entity.setTotalEmissions(totalEmission.join());

        // Step 3: Save the CarbonFootprintData entity
        CarbonFootprintData savedData = repository.save(entity);

        // Step 4: Interpolate and save CarbonFootprintHistory
        YearMonth startDate = convertToYearMonth(dto.getBeginDate());
        System.out.println("Start Date: " + startDate);
        YearMonth endDate = convertToYearMonth(dto.getEndDate());
        System.out.println("End Date: " + endDate);
        double totalValue = entity.getTotalEmissions(); // Or dto.getTotalValue() if it comes from input

        List<CreateCarbonFootprintHistoryDTO> interpolatedData =
                carbonFootprintHistoryService.getInterpolatedData(companyOwner.getId(), startDate, endDate, totalValue);
        System.out.println("Interpolated Data: " + interpolatedData);
        carbonFootprintHistoryService.saveOrUpdateAll(interpolatedData, companyOwner.getId());

        return savedData;
    }


    @Override
    public List<CarbonFootprintDataDTO> findAllData() {
        return findAll().stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CarbonFootprintDataDTO findDataById(Long id) {
        CarbonFootprintData entity = findById(id);
        return dataMapper.toDto(entity);
    }


    @Override
    public List<CarbonFootprintDataDTO> findByCompanyOwnerId( ) {
        Long ownerId = authService.getCurrentCompanyOwner().getId();
        return repository.findByCompanyOwner_Id(ownerId).stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }




}
