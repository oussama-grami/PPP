package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintCreateDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintDataDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import java.util.List;

public interface CarbonFootprintDataService extends CRUDService<CarbonFootprintData, Long> {
    // DTO-based operations
    CarbonFootprintData saveData(CarbonFootprintCreateDTO dto);
    List<CarbonFootprintDataDTO> findAllData();
    CarbonFootprintDataDTO findDataById(Long id);
    List<CarbonFootprintDataDTO> findByCompanyOwnerId();
}