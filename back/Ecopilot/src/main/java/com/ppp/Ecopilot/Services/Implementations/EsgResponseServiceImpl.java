package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.EsgOptionDTO;
import com.ppp.Ecopilot.DTO.Response.CreateResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Repositories.EsgOptionRepo;
import com.ppp.Ecopilot.Services.AuthService;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import com.ppp.Ecopilot.Services.EsgResponseService;
import com.ppp.Ecopilot.Repositories.EsgResponseRepo;
import com.ppp.Ecopilot.Mappers.EsgResponseMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EsgResponseServiceImpl  implements EsgResponseService {

    private final EsgResponseRepo esgResponseRepo;
    private final EsgResponseMapper esgResponseMapper;
    private final EsgQuestionServiceImpl esgQuestionService;
    private final EsgOptionServiceImpl esgOptionService;
    private final AuthService authService;
    private final CompanyOwnerService companyOwnerService;

    public EsgResponseServiceImpl(EsgResponseRepo esgResponseRepo, EsgResponseMapper esgResponseMapper, EsgQuestionServiceImpl esgQuestionService, EsgOptionServiceImpl esgOptionService, CompanyOwnerRepo companyOwnerRepo, CompanyOwnerService companyOwnerService,AuthService authService) {
        this.esgResponseRepo = esgResponseRepo;
        this.esgResponseMapper = esgResponseMapper;
        this.esgQuestionService = esgQuestionService;
        this.esgOptionService = esgOptionService;
        this.authService=authService;
        this.companyOwnerService = companyOwnerService;
    }

    public List<EsgResponseDTO> getEsgResponsesByCategoryAndCompanyId(EsgCategory category, Long companyId) {
        List<EsgResponse> esgResponses = esgResponseRepo.findByEsgQuestionCategoryAndCompanyOwnerId(category, companyId);
        return esgResponseMapper.toDtoList(esgResponses);
    }

    public List<EsgResponsesByCategoryDTO> getAllEsgResponsesByCategory() {
        long companyId = this.authService.getCurrentCompanyOwner().getId();
        List<EsgResponsesByCategoryDTO> responsesByCategory = List.of(EsgCategory.values()).stream()
                .map(category -> new EsgResponsesByCategoryDTO(
                        category,
                        esgResponseMapper.toDtoList(
                                esgResponseRepo.findByEsgQuestionCategoryAndCompanyOwnerId(category, companyId)
                        )
                ))
                .toList();

        return responsesByCategory;
    }


    @Override
    public EsgResponse save(CreateResponseDTO dto) {
        long companyOwnerId =this.authService.getCurrentCompanyOwner().getId();

        EsgResponse existingResponse = esgResponseRepo.findByCompanyOwnerIdAndEsgQuestionId(companyOwnerId, dto.getQuestionId());

        EsgResponse esgResponse;
        if (existingResponse != null) {
            esgResponse = existingResponse;
        } else {
            esgResponse = new EsgResponse();

            CompanyOwner companyOwner = companyOwnerService.findById(companyOwnerId);
            if (companyOwner == null) {
                throw new IllegalArgumentException("CompanyOwner not found for id: " + companyOwnerId);
            }
            esgResponse.setCompanyOwner(companyOwner);
        }

        EsgQuestion esgQuestion = esgQuestionService.findById(dto.getQuestionId());
        if (esgQuestion == null) {
            throw new IllegalArgumentException("EsgQuestion not found for id: " + dto.getQuestionId());
        }
        esgResponse.setEsgQuestion(esgQuestion);

        EsgOption esgOption = esgOptionService.findByIdEsgOption(dto.getOptionId());
        if (esgOption == null) {
            throw new IllegalArgumentException("EsgOption not found for id: " + dto.getOptionId());
        }
        esgResponse.setEsgOption(esgOption);

        esgResponseRepo.save(esgResponse);

        return esgResponse;
    }




    @Override
    public void deleteById(Long id) {
        EsgResponse esgResponse = esgResponseRepo.findById(id).orElseThrow(() -> new RuntimeException("Response not found"));
        esgResponseRepo.delete(esgResponse);

    }

    @Override
    public EsgResponseDTO findById(Long id) {
        EsgResponse esgResponse = esgResponseRepo.findById(id).orElseThrow(() -> new RuntimeException("Response not found"));
        return esgResponseMapper.toDto(esgResponse);

    }

    @Override
    public EsgResponseDTO getAnswerByCompanyIdAndQuestionId(long companyId, long questionId) {
        EsgResponse esgResponse = esgResponseRepo.findByCompanyOwnerIdAndEsgQuestionId(companyId, questionId);
        if (esgResponse == null) {
            return null;
        }
        return esgResponseMapper.toDto(esgResponse);
    }


}
