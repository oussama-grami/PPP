package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.EsgResponseDTO;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import com.ppp.Ecopilot.Services.EsgResponseService;
import com.ppp.Ecopilot.Repositories.EsgResponseRepo;
import com.ppp.Ecopilot.Mappers.EsgResponseMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EsgResponseServiceImpl implements EsgResponseService {

    private final EsgResponseRepo esgResponseRepo;
    private final EsgResponseMapper esgResponseMapper;
    private final EsgQuestionServiceImpl esgQuestionService;
    private final EsgOptionServiceImpl esgOptionService;

    public EsgResponseServiceImpl(EsgResponseRepo esgResponseRepo, EsgResponseMapper esgResponseMapper, EsgQuestionServiceImpl esgQuestionService, EsgOptionServiceImpl esgOptionService) {
        this.esgResponseRepo = esgResponseRepo;
        this.esgResponseMapper = esgResponseMapper;
        this.esgQuestionService = esgQuestionService;
        this.esgOptionService = esgOptionService;

    }
    public List<EsgResponseDTO> getEsgResponsesByCategory(EsgCategory category, Long companyId) {
        List<EsgResponse> esgResponses = esgResponseRepo.findByEsgQuestionCategoryAndCompanyOwnerId(category, companyId);
        return esgResponseMapper.toDtoList(esgResponses);
    }

    @Override
    public void saveEsgResponse(Long questionId, Long optionId,Long companyId) {
        if (questionId == null || optionId == null) {
            throw new IllegalArgumentException("QuestionId and OptionId cannot be null");
        }

        EsgResponse esgResponse = new EsgResponse();

        EsgQuestion esgQuestion = esgQuestionService.findById(questionId);
        if (esgQuestion == null) {
            throw new IllegalArgumentException("EsgQuestion not found for id: " + questionId);
        }
        esgResponse.setEsgQuestion(esgQuestion);
        EsgOption esgOption =esgOptionService.findById(optionId);
        if (esgOption == null) {
            throw new IllegalArgumentException("EsgOption not found for id: " + optionId);
        }
        esgResponse.setEsgOption(esgOption);
        CompanyOwner companyOwner = new CompanyOwner();
        esgResponse.setCompanyOwner(companyOwner);

        esgResponseRepo.save(esgResponse);
    }

}
