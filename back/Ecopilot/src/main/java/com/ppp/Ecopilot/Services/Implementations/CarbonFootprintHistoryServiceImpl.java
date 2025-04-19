package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Mappers.CarbonHistoryMapper;
import com.ppp.Ecopilot.Repositories.CarbonFootprintHistoryRepo;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;



@Service
public class CarbonFootprintHistoryServiceImpl extends AbstractCrudService<CarbonFootprintHistory, Long> implements CarbonFootprintHistoryService {


    private final CarbonFootprintHistoryRepo carbonFootprintHistoryRepo;
    private final CarbonHistoryMapper historyMapper;
    private final CompanyOwnerService companyOwnerService;

    public CarbonFootprintHistoryServiceImpl(CarbonFootprintHistoryRepo carboneFootprintHistoryRepo, CarbonHistoryMapper historyMapper, CompanyOwnerService companyOwnerService) {
        this.carbonFootprintHistoryRepo = carboneFootprintHistoryRepo;
        this.historyMapper = historyMapper;
        this.companyOwnerService = companyOwnerService;
    }

    @Override
    protected JpaRepository<CarbonFootprintHistory, Long> getRepository() {
        return carbonFootprintHistoryRepo;
    }

    @Override
    protected Class<CarbonFootprintHistory> getEntityClass() {
        return CarbonFootprintHistory.class;
    }

    @Override
    public CarbonFootprintHistoryDTO[] findByCurrentCompanyOwner() {
        long companyOwnerId = 7L; // Replace with dynamic retrieval if needed
        List<CarbonFootprintHistory> historyList = carbonFootprintHistoryRepo.findByCompanyOwnerIdOrderByDateAsc(companyOwnerId);

        // Debugging logs
        System.out.println("CompanyOwnerId: " + companyOwnerId);
        System.out.println("History List Size: " + historyList.size());

        CarbonFootprintHistoryDTO[] historyDTOs = new CarbonFootprintHistoryDTO[historyList.size()];
        for (int i = 0; i < historyList.size(); i++) {
            historyDTOs[i] = historyMapper.toDto(historyList.get(i));
        }
        return historyDTOs;
    }



    @Override
    public void interpolateData(CarbonFootprintData data, Long id) {

    }

    @Override
    public CarbonFootprintHistory[] forecastData(CarbonFootprintHistory[] data) {
        return new CarbonFootprintHistory[0];
    }

    @Override
    public void saveForecastData(CarbonFootprintHistoryDTO[] data) {

    }

    @Override
    public void saveCarbonFootprint(CreateCarbonFootprintHistoryDTO data) {
        CarbonFootprintHistory entity = historyMapper.toEntity(data);
        CompanyOwner owner= companyOwnerService.findById(7L);
        entity.setCompanyOwner(owner);
        carbonFootprintHistoryRepo.save(entity);


    }

    @Override
    public void saveAllCarbonFootprint(List<CreateCarbonFootprintHistoryDTO> data) {
        CompanyOwner owner= companyOwnerService.findById(7L);
        for (CreateCarbonFootprintHistoryDTO dto : data) {
            CarbonFootprintHistory entity = historyMapper.toEntity(dto);
            entity.setCompanyOwner(owner);
            carbonFootprintHistoryRepo.save(entity);
        }
    }

    @Override
    public void updateCarbonFootprint(Long id,CarbonFootprintHistoryDTO data) {
        CarbonFootprintHistory entity = carbonFootprintHistoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Carbon footprint history not found"));
        entity.setDate(data.getDate());
        entity.setPredicted(data.isPredicted());
        entity.setValue(data.getValue());
        carbonFootprintHistoryRepo.save(entity);



    }

    @Override
    public void deleteCarbonFootprint(Long id) {
        CarbonFootprintHistory entity = carbonFootprintHistoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Carbon footprint history not found"));
        carbonFootprintHistoryRepo.delete(entity);

    }


}
