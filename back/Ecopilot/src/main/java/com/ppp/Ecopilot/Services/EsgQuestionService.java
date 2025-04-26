package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import com.ppp.Ecopilot.Enums.EsgCategory;

import java.util.List;

public interface EsgQuestionService  extends CRUDService<EsgQuestion, Long> {

    EsgQuestionDTO getQuestionById (Long id);
    List<EsgQuestionDTO> loadQuestionByCategoryWithOption(EsgCategory category);
    void saveAll(List<EsgQuestion> questions);
    List<EsgQuestionDTO> getAll();
    void saveQuestion(EsgQuestionDTO questionDTO);
    void updateQuestion(EsgQuestionDTO questionDTO, Long id);
}
