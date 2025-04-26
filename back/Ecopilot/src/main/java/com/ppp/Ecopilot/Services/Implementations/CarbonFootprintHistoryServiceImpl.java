package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintForecastRequest;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintForecastResponse;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Mappers.CarbonHistoryMapper;
import com.ppp.Ecopilot.Repositories.CarbonFootprintHistoryRepo;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@Service
public class CarbonFootprintHistoryServiceImpl extends AbstractCrudService<CarbonFootprintHistory, Long> implements CarbonFootprintHistoryService {

    private final CarbonFootprintHistoryRepo carbonFootprintHistoryRepo;
    private final CarbonHistoryMapper historyMapper;
    private final CompanyOwnerService companyOwnerService;
    private final WebClient webClient;

    public CarbonFootprintHistoryServiceImpl(CarbonFootprintHistoryRepo carboneFootprintHistoryRepo, CarbonHistoryMapper historyMapper, CompanyOwnerService companyOwnerService, WebClient.Builder webClientBuilder) {
        this.carbonFootprintHistoryRepo = carboneFootprintHistoryRepo;
        this.historyMapper = historyMapper;
        this.companyOwnerService = companyOwnerService;

        this.webClient = webClientBuilder
                .baseUrl("http://localhost:5000") // Flask API URL
                .build();
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



    public CarbonFootprintHistoryDTO[] forecastData() {
        try {
            CarbonFootprintHistoryDTO[] historyList = this.findByCurrentCompanyOwner();
            System.out.println("History List: " + Arrays.toString(historyList));

            // Convert historical data to API request format
            CarbonFootprintForecastRequest request = new CarbonFootprintForecastRequest();

            List<Integer> years = new ArrayList<>();
            List<Integer> months = new ArrayList<>();
            List<Double> values = new ArrayList<>();

            for (CarbonFootprintHistoryDTO entry : historyList) {
                YearMonth ym = entry.getDate();
                years.add(ym.getYear());
                months.add(ym.getMonthValue());
                values.add(entry.getValue());
            }

            request.setYear(years);
            request.setMonth(months);
            request.setCarbon_footprint_kgCO2(values);
            System.out.println("Request: " + request);
            // Send request to forecasting API
            Mono<CarbonFootprintForecastResponse> responseMono = webClient.post()
                    .uri("/forecast")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(CarbonFootprintForecastResponse.class);

            CarbonFootprintForecastResponse response = responseMono.block();

            // Convert API response to CarbonFootprintHistoryDTO[]
            List<CarbonFootprintHistoryDTO> forecastList = new ArrayList<>();
            for (CarbonFootprintForecastResponse.PredictedEntry entry : response.getPredicted_carbon_footprint_kgCO2()) {
                CarbonFootprintHistoryDTO dto = new CarbonFootprintHistoryDTO();
                dto.setDate(YearMonth.of(entry.getYear(), entry.getMonth()));
                dto.setValue(entry.getCarbon_footprint_kgCO2());
                dto.setPredicted(true);
                forecastList.add(dto);
            }

            return forecastList.toArray(new CarbonFootprintHistoryDTO[0]);

        } catch (Exception e) {
            e.printStackTrace();
            return new CarbonFootprintHistoryDTO[0];
        }
    }

    @Override
    public void saveCarbonFootprint(CreateCarbonFootprintHistoryDTO data) {
        CarbonFootprintHistory entity = historyMapper.toEntity(data);
        CompanyOwner owner= companyOwnerService.findById(7L);
        entity.setCompanyOwner(owner);
        carbonFootprintHistoryRepo.save(entity);


    }

    @Override
    public void saveAllCarbonFootprint(List<CreateCarbonFootprintHistoryDTO> dataList) {
        List<CarbonFootprintHistory> entities = new ArrayList<>();

        CompanyOwner owner = companyOwnerService.findById(7L); // Fetch once, not inside the loop!

        for (CreateCarbonFootprintHistoryDTO data : dataList) {
            CarbonFootprintHistory entity = historyMapper.toEntity(data);
            entity.setCompanyOwner(owner);
            entities.add(entity);
        }

        carbonFootprintHistoryRepo.saveAll(entities);
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
