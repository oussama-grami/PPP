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
import com.ppp.Ecopilot.Services.AuthService;
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



    @Override
    public CarbonFootprintData saveData(CarbonFootprintCreateDTO dto) {
        String keycloakId = authService.getCurrentUser().keycloak_id();
        if (keycloakId == null) {
            throw new IllegalStateException("User is not authenticated");
        }
        CompanyOwner owner = companyOwnerRepository.findById(Long.valueOf(keycloakId))
                .orElseThrow(() -> new EntityNotFoundException("CompanyOwner not found"));
        owner.keycloakId=keycloakId;
        CarbonFootprintData entity = createMapper.toEntity(dto);
        CarbonFootprintModelRequest modelRequest = calculationService.buildModelRequestFromEntity(entity);

        CompletableFuture<Double> totalEmission = calculationService.calculateTotalEmissionFromModelAsync(modelRequest);
        entity.setTotalEmissions(totalEmission.join());
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


    @Override
    public List<CarbonFootprintDataDTO> findByCompanyOwnerId( ) {
        Long ownerId = authService.getCurrentCompanyOwner().getId();
        return repository.findByCompanyOwner_Id(ownerId).stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }




}
