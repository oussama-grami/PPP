package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.CreateResponseDTO;
import com.ppp.Ecopilot.DTO.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.Enums.EsgCategory;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EsgResponseService  {
    List<EsgResponseDTO> getEsgResponsesByCategoryAndCompanyId(EsgCategory category, Long companyId);
    List<EsgResponsesByCategoryDTO> getAllEsgResponsesByCategory(Long companyId);
    EsgResponseDTO save(CreateResponseDTO dto);


}
