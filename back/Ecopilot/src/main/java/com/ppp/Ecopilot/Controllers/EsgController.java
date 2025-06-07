package com.ppp.Ecopilot.Controllers;


import com.ppp.Ecopilot.DTO.*;
import com.ppp.Ecopilot.DTO.Response.CreateResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.Response.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import com.ppp.Ecopilot.Services.AuthService;
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
    private final AuthService authService;



    //CRUD for questions
    @GetMapping("/questions")
    public List<EsgQuestionDTO> getAllQuestions(){
            return esgQuestionService.getAll();
    }
    @GetMapping("/question/{questionId}")
    public EsgQuestionDTO getEsgQuestionById(@PathVariable Long questionId) {
        return esgQuestionService.getQuestionById(questionId);
    }
    @DeleteMapping("/questions/{id}")
    public void deleteEsgQuestion(@PathVariable Long id) {
        esgQuestionService.deleteById(id);
    }

    @PostMapping("/questions")
    public void  createEsgQuestion(@RequestBody EsgQuestionDTO dto) {
        esgQuestionService.saveQuestion(dto);
    }
    @PutMapping("/questions/{id}")
    public void updateEsgQuestion(@RequestBody EsgQuestionDTO dto, @PathVariable Long id) {
        esgQuestionService.updateQuestion(dto, id);
    }

    @GetMapping("/questions/{category}")
    public List<EsgQuestionDTO> getQuestionsByCategory(@PathVariable String category) {
        return esgQuestionService.loadQuestionByCategoryWithOption(EsgCategory.valueOf(category));
    }
    
    
    //CRUD for responses
    @PostMapping("/responses")
   public EsgResponse saveEsgResponse(@RequestBody CreateResponseDTO dto) {

        return esgResponseService.save(dto);
    }


    @GetMapping("/responses")
    public List<EsgResponsesByCategoryDTO> getEsgResponses() {
        return esgResponseService.getAllEsgResponsesByCategory();
    }

    @DeleteMapping("/responses/{id}")
    public void deleteEsgResponse(@PathVariable Long id) {
        esgResponseService.deleteById(id);
    }





    //calculation Logic
    @GetMapping("/calculate")
    public EsgResultDTO calculateEsg() {
        long companyOwnerId = authService.getCurrentCompanyOwner().getId();
        return esgService.calculateEsg(companyOwnerId);
    }







}
