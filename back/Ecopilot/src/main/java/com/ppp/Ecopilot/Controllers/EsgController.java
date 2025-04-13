package com.ppp.Ecopilot.Controllers;


import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.DTO.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.DTO.EsgResultDTO;
import com.ppp.Ecopilot.Enums.EsgCategory;
import com.ppp.Ecopilot.Services.EsgQuestionService;
import com.ppp.Ecopilot.Services.EsgResponseService;
import com.ppp.Ecopilot.Services.EsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/esg")
@RequiredArgsConstructor

public class EsgController  {

    private final EsgService esgService;
    private final EsgQuestionService esgQuestionService;
    private final EsgResponseService esgResponseService;


    @GetMapping("/questions")
    public List<EsgQuestionDTO> getEsgQuestions(@RequestParam(required = false) EsgCategory category) {
        // If category is not provided, handle accordingly

        return esgQuestionService.loadQuestionByCategoryWithOption(category);
    }

    @PostMapping("/responses")
    public void saveEsgResponse(@RequestParam Long questionId, @RequestParam Long optionId, @RequestParam Long companyId) {
        esgResponseService.saveEsgResponse(questionId, optionId, companyId);
    }


    @GetMapping("/responses")
    public List<EsgResponsesByCategoryDTO> getEsgResponses(@RequestParam Long companyId) {
        return esgResponseService.getAllEsgResponsesByCategory(companyId);
    }


    @GetMapping("/calculate")
    public EsgResultDTO calculateEsg(@RequestParam Long companyId) {

        return esgService.calculateEsg(companyId);
    }




}
