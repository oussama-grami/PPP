package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintCreateDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintDataDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Enums.Unit;
import com.ppp.Ecopilot.Enums.CarburantType;
import com.ppp.Ecopilot.Mappers.CarbonFootprint.CarbonFootprintCreateMapper;
import com.ppp.Ecopilot.Mappers.CarbonFootprint.CarbonFootprintDataMapper;
import com.ppp.Ecopilot.Repositories.CarbonFootprintDataRepo;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Services.CalculationService;
import com.ppp.Ecopilot.Services.CarbonFootprintDataService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
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

    // Base repository provider for generic CRUD
    @Override
    protected JpaRepository<CarbonFootprintData, Long> getRepository() {
        return repository;
    }

    @Override
    protected Class<CarbonFootprintData> getEntityClass() {
        return CarbonFootprintData.class;
    }

    // --- Entity-level CRUD ---

    @Override
    public CarbonFootprintData save(CarbonFootprintData entity) {
        return super.save(entity);
    }

    @Override
    public List<CarbonFootprintData> findAll() {
        return super.findAll();
    }

    @Override
    public CarbonFootprintData findById(Long id) {
        return super.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        super.deleteById(id);
    }

    // --- DTO-based methods ---

    @Override
    public CarbonFootprintData saveData(CarbonFootprintCreateDTO dto) {
        CompanyOwner owner = companyOwnerRepository.findById(dto.getCompanyOwnerId())
                .orElseThrow(() -> new EntityNotFoundException("CompanyOwner not found"));

        CarbonFootprintData entity = createMapper.toEntityWithOwner(dto, owner);

        // Step 1: Build request and send POST to model API
        CarbonFootprintModelRequest modelRequest = calculationService.buildModelRequestFromEntity(entity);

        // Step 2: Compute individual emissions and set on entity
        entity.setCarburantEmissions(calculationService.calculateCarburantEmissions(entity));
        entity.setEnergyEmissions(calculationService.calculateEnergyEmissions(entity));
        entity.setImmobilisationEmissions(calculationService.calculateImmobilisationEmissions(entity));
        entity.setConsomableEmissions(calculationService.calculateConsomableEmissions(entity));
        entity.setFreightEmission(calculationService.calculateFreightEmissions(entity));
        entity.setAerienEmission(calculationService.calculateAerienEmissions(entity));

        // Step 3: Get total emission using the jobId
        CompletableFuture<Double> totalEmission = calculationService.calculateTotalEmissionFromModelAsync(modelRequest);
        entity.setTotalEmissions(totalEmission.join());
        // Step 4: Save everything
        return repository.save(entity);
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

    // --- Business-specific methods ---

    @Override
    public List<CarbonFootprintDataDTO> findByCompanyOwnerId(Long ownerId) {
        return repository.findByCompanyOwner_Id(ownerId).stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Double calculateTotalEmissionsForOwner(Long ownerId) {
        return repository.findByCompanyOwner_Id(ownerId).stream()
                .mapToDouble(CarbonFootprintData::getTotalEmissions)
                .sum();
    }



}
