package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.EsgOptionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public interface EsgOptionService {
    List<EsgOption> findByEsgQuestionId(Long questionId);
     EsgOptionDTO findById(Long id);
     EsgOption findByIdEsgOption(Long id);
    EsgOption save(EsgOptionDTO esgOptionDTO);
    EsgOption update(EsgOptionDTO esgOptionDTO, Long id);
    void deleteById(Long id);
    List<EsgOptionDTO> findAll();


}
