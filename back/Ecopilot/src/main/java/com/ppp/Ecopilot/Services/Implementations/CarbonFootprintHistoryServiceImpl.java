package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintForecastRequest;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintForecastResponse;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Mappers.CarbonHistoryMapper;
import com.ppp.Ecopilot.Mappers.CarbonInterpolationMapper;
import com.ppp.Ecopilot.Repositories.CarbonFootprintHistoryRepo;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class CarbonFootprintHistoryServiceImpl extends AbstractCrudService<CarbonFootprintHistory, Long> implements CarbonFootprintHistoryService {

    private final CarbonFootprintHistoryRepo carbonFootprintHistoryRepo;
    private final CarbonHistoryMapper historyMapper;
    private final CompanyOwnerService companyOwnerService;
    private final WebClient webClient;
    private final CarbonInterpolationMapper carbonInterpolationMapper;
    private static final String FLASK_INTERPOLATE_URL = "http://localhost:5000/interpolate";

    public CarbonFootprintHistoryServiceImpl(CarbonFootprintHistoryRepo carboneFootprintHistoryRepo, CarbonHistoryMapper historyMapper, CompanyOwnerService companyOwnerService, WebClient.Builder webClientBuilder, CarbonInterpolationMapper carbonInterpolationMapper) {
        this.carbonFootprintHistoryRepo = carboneFootprintHistoryRepo;
        this.historyMapper = historyMapper;
        this.companyOwnerService = companyOwnerService;
        this.carbonInterpolationMapper = carbonInterpolationMapper;

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
            Mono<List<CarbonFootprintForecastResponse.PredictedEntry>> responseMono = webClient.post()
                    .uri("/forecast")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<CarbonFootprintForecastResponse.PredictedEntry>>() {});

            List<CarbonFootprintForecastResponse.PredictedEntry> response = responseMono.block();

            // Convert API response to CarbonFootprintHistoryDTO[]
            List<CarbonFootprintHistoryDTO> forecastList = new ArrayList<>();
            for (CarbonFootprintForecastResponse.PredictedEntry entry : response) {
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
        CompanyOwner owner = companyOwnerService.findById(7L); // Replace with dynamic owner id as needed
        entity.setCompanyOwner(owner);

        try {
            carbonFootprintHistoryRepo.save(entity);
        } catch (DataIntegrityViolationException e) {
            // Handle the exception or log it here if needed
            throw e; // Rethrow to be caught in the controller
        }
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
    public List<CreateCarbonFootprintHistoryDTO> getInterpolatedData(
            Long companyOwnerId,
            YearMonth startDate,
            YearMonth endDate,
            double totalValue) {

        List<CarbonFootprintHistory> historyList = carbonFootprintHistoryRepo.findByCompanyOwnerIdOrderByDateAsc(companyOwnerId);

        if (historyList.isEmpty()) {
            throw new RuntimeException("No historical data found.");
        }

        // Step 2: Use mapper to convert to Flask-compatible format
        List<Map<String, Object>> historicalJson = carbonInterpolationMapper.toHistoricalData(historyList);

        // Step 3: Build request body
        Map<String, Object> flaskRequestBody = Map.of(
                "historical", historicalJson,
                "start_date", startDate + "-01",
                "end_date", endDate + "-01",
                "total_value", totalValue
        );

        // Step 4: Call Flask API
        ResponseEntity<List<CreateCarbonFootprintHistoryDTO>> response = webClient.post()
                .uri(FLASK_INTERPOLATE_URL)
                .body(Mono.just(flaskRequestBody), Map.class)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<CreateCarbonFootprintHistoryDTO>>() {})
                .block();

        if (response == null || !response.hasBody()) {
            throw new RuntimeException("No response from Flask API");
        }

        List<CreateCarbonFootprintHistoryDTO> flaskResult = response.getBody();

        flaskResult.forEach(dto -> dto.setPredicted(true));

        return flaskResult;
    }
    @Override
    public void deleteCarbonFootprint(Long id) {
        CarbonFootprintHistory entity = carbonFootprintHistoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Carbon footprint history not found"));
        carbonFootprintHistoryRepo.delete(entity);

    }

    @Override
    public void interpolateData(CarbonFootprintData data, Long id) {

    }



    public void saveOrUpdateAll(List<CreateCarbonFootprintHistoryDTO> dtos, Long companyOwnerId) {
        for (CreateCarbonFootprintHistoryDTO dto : dtos) {
            Optional<CarbonFootprintHistory> existingRecord = carbonFootprintHistoryRepo.findByCompanyOwnerIdOrderByDateAsc(companyOwnerId)
                    .stream()
                    .filter(record -> record.getDate().equals(dto.getDate()))
                    .findFirst();

            CarbonFootprintHistory historyEntity;

            if (existingRecord.isPresent()) {
                // Update existing record
                historyEntity = existingRecord.get();
                historyEntity.setValue(dto.getValue());
                historyEntity.setPredicted(dto.isPredicted());
            } else {
                historyEntity = new CarbonFootprintHistory();
                historyEntity.setDate(dto.getDate());
                historyEntity.setValue(dto.getValue());
                historyEntity.setPredicted(dto.isPredicted());

                CompanyOwner owner = companyOwnerService.findById(companyOwnerId);
                historyEntity.setCompanyOwner(owner);
            }

            carbonFootprintHistoryRepo.save(historyEntity);
        }
    }


}
