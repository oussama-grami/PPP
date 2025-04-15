package com.ppp.Ecopilot.Services;


import com.ppp.Ecopilot.DTO.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;

import java.time.YearMonth;
import java.util.List;

public interface CarbonFootprintHistoryService extends CRUDService<CarbonFootprintHistory, Long> {


    CarbonFootprintHistoryDTO[] findByCurrentCompanyOwner();

    void interpolateData(CarbonFootprintData data, Long id);
    CarbonFootprintHistory[] forecastData(CarbonFootprintHistory[] data);
    void saveForecastData(CarbonFootprintHistoryDTO[] data);
    void saveCarbonFootprint(CreateCarbonFootprintHistoryDTO data);
    void saveAllCarbonFootprint(List<CreateCarbonFootprintHistoryDTO> data);

    void updateCarbonFootprint(Long id,CarbonFootprintHistoryDTO data);

    void deleteCarbonFootprint(Long id);




}