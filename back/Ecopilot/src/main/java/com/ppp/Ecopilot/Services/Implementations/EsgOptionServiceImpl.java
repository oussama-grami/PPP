package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Repositories.EsgOptionRepo;
import com.ppp.Ecopilot.Services.EsgOptionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EsgOptionServiceImpl extends AbstractCrudService<EsgOption, Long> implements EsgOptionService {

    private final  EsgOptionRepo esgOptionRepository;

    public EsgOptionServiceImpl(EsgOptionRepo esgOptionRepository) {
        this.esgOptionRepository = esgOptionRepository;
    }


    @Override
    protected JpaRepository<EsgOption, Long> getRepository() {
        return esgOptionRepository;
    }

    @Override
    protected Class<EsgOption> getEntityClass() {
        return EsgOption.class;
    }

    public List<EsgOption> findByEsgQuestionId(Long questionId) {
        return esgOptionRepository.findByEsgQuestionId(questionId);
    }




}
