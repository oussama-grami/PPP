package com.ppp.Ecopilot.Services;


import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;

import java.util.List;

public interface CarbonFootprintHistoryService extends CRUDService<CarbonFootprintHistory, Long> {


    CarbonFootprintHistoryDTO[] findByCurrentCompanyOwner();
    void updateCarbonFootprint(Long id,CarbonFootprintHistoryDTO data);
    void deleteCarbonFootprint(Long id);

    //forecast
    void interpolateData(CarbonFootprintData data, Long id);
    CarbonFootprintHistoryDTO[] forecastData();
    void saveCarbonFootprint(CreateCarbonFootprintHistoryDTO data);
    void saveAllCarbonFootprint(List<CreateCarbonFootprintHistoryDTO> data);





}