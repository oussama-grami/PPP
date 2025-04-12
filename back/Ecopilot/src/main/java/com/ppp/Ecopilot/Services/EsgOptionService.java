package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.Entities.EsgOption;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public interface EsgOptionService {
    public List<EsgOption> findByEsgQuestionId(Long questionId);
}
