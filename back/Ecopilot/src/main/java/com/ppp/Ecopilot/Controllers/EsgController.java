package com.ppp.Ecopilot.Controllers;


import com.ppp.Ecopilot.DTO.*;
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


@CrossOrigin(origins = "http://localhost:4200") // Port Angular

public class EsgController  {

    private final EsgService esgService;
    private final EsgQuestionService esgQuestionService;
    private final EsgResponseService esgResponseService;


    /*@GetMapping("/questions")
    public List<EsgQuestionDTO> getEsgQuestionsByCategory(@RequestParam(required = false) EsgCategory category) {
        // If category is not provided, handle accordingly

        return esgQuestionService.loadQuestionByCategoryWithOption(category);
    }*/

    @GetMapping("/questions")
    public List<EsgQuestionDTO> getAllQuestions(){
            return esgQuestionService.getAll();
    }

    @PostMapping("/responses")
   public EsgResponseDTO saveEsgResponse(@RequestBody CreateResponseDTO dto) {
        return esgResponseService.save(dto);
    }


    @GetMapping("/responses")
    public List<EsgResponsesByCategoryDTO> getEsgResponses() {
        long companyId = 7; // Replace with actual company ID
        return esgResponseService.getAllEsgResponsesByCategory(companyId);
    }


    @GetMapping("/calculate")
    public EsgResultDTO calculateEsg() {
        long companyId = 7; // Replace with actual company ID
        return esgService.calculateEsg();
    }



    @GetMapping("/question/{questionId}")
    public EsgQuestionDTO getEsgQuestionById(@PathVariable Long questionId) {
        return esgQuestionService.getQuestioById(questionId);
    }




}
