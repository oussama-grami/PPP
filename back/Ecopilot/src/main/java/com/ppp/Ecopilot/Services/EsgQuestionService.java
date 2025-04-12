package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import com.ppp.Ecopilot.Enums.EsgCategory;

import java.util.List;

public interface EsgQuestionService  extends CRUDService<EsgQuestion, Long> {


    List<EsgQuestionDTO> loadQuestionByCategoryWithOption(EsgCategory category);
    List<EsgQuestion> findByCategory(String category);
    void saveAll(List<EsgQuestion> questions);

}
