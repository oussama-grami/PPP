package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.Response.CreateResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EsgResponseService  {
    List<EsgResponseDTO> getEsgResponsesByCategoryAndCompanyId(EsgCategory category, Long companyId);
    List<EsgResponsesByCategoryDTO> getAllEsgResponsesByCategory();
    EsgResponse save(CreateResponseDTO dto);
    void deleteById(Long id);
    EsgResponseDTO findById(Long id);
    EsgResponseDTO getAnswerByCompanyIdAndQuestionId(long companyId, long questionId);


}
