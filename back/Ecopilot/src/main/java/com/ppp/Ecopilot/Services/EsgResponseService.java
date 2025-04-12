package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EsgResponseDTO;
import com.ppp.Ecopilot.Enums.EsgCategory;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EsgResponseService {
    List<EsgResponseDTO> getEsgResponsesByCategory(EsgCategory category, Long companyId);

    void saveEsgResponse(Long questionId, Long optionId, Long companyId);



}
