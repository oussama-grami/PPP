package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.Response.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.EsgResultDTO;

import com.ppp.Ecopilot.Services.EsgResponseService;
import org.springframework.stereotype.Service;
import com.ppp.Ecopilot.Enums.EsgCategory;

import java.util.List;

@Service
public class EsgServiceImpl  implements com.ppp.Ecopilot.Services.EsgService {

    private final EsgResponseService esgResponseService;

    public EsgServiceImpl( EsgResponseService esgResponseService) {

        this.esgResponseService = esgResponseService;

    }





    @Override
    public EsgResultDTO calculateEsg(Long companyOwnerId) {

        List<EsgResponseDTO> EnvironmentResponses = esgResponseService.getEsgResponsesByCategoryAndCompanyId(EsgCategory.ENVIRONMENTAL, companyOwnerId);
        List<EsgResponseDTO> SocialResponses = esgResponseService.getEsgResponsesByCategoryAndCompanyId(EsgCategory.SOCIAL, companyOwnerId);
        List<EsgResponseDTO> GovernanceResponses = esgResponseService.getEsgResponsesByCategoryAndCompanyId(EsgCategory.GOVERNANCE, companyOwnerId);
        EsgResultDTO results = new EsgResultDTO();

        results.setEnvironment(calculateCategoryScore(EnvironmentResponses));
        results.setSocial(calculateCategoryScore(SocialResponses));
        results.setGovernance(calculateCategoryScore(GovernanceResponses));
        int total = Math.round((results.getEnvironment() + results.getSocial() + results.getGovernance()) / 3.0f);
        results.setTotal(total);

        return results;
    }


    private int calculateCategoryScore(List<EsgResponseDTO> responses) {
        int total = 0;
        for (EsgResponseDTO response : responses) {

            total+=response.getScore();
        }
        return total;
    }






}
