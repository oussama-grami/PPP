package com.ppp.Ecopilot.Services;


import com.ppp.Ecopilot.Entities.CarboneFootprintHistory;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;

public interface CarboneFootprintHistoryService  extends CRUDService<CarboneFootprintHistory, Long> {

    CarboneFootprintHistory[] findByCompanyOwnerId(Long id);

    void interpolateData(CarbonFootprintData data, Long id);
    CarboneFootprintHistory[] forecastData(CarboneFootprintHistory[] data);

}