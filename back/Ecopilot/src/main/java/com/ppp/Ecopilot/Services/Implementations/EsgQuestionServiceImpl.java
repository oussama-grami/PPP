package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Enums.EsgCategory;
import com.ppp.Ecopilot.Mappers.EsgOptionMapper;
import com.ppp.Ecopilot.Mappers.EsgQuestionMapper;
import com.ppp.Ecopilot.Repositories.EsgQuestionRepo;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EsgQuestionServiceImpl extends AbstractCrudService<EsgQuestion, Long> implements com.ppp.Ecopilot.Services.EsgQuestionService {
    private final EsgQuestionRepo esgQuestionRepo;
    private final EsgQuestionMapper esgQuestionMapper;
    private final EsgOptionServiceImpl esgOptionService;
    private final EsgOptionMapper esgOptionMapper;
    public EsgQuestionServiceImpl(EsgQuestionRepo esgQuestionRepo, EsgQuestionMapper esgQuestionMapper, EsgOptionServiceImpl esgOptionService, EsgOptionMapper esgOptionMapper) {
        this.esgQuestionRepo = esgQuestionRepo;
        this.esgQuestionMapper = esgQuestionMapper;
        this.esgOptionService = esgOptionService;
        this.esgOptionMapper = esgOptionMapper;
    }

    @Override
    public List<EsgQuestion> findByCategory(String category) {
        return esgQuestionRepo.findByCategory(EsgCategory.valueOf(category));
    }

    @Override
    protected JpaRepository<EsgQuestion, Long> getRepository() {
        return this.esgQuestionRepo;
    }

    @Override
    protected Class<EsgQuestion> getEntityClass() {
        return EsgQuestion.class;
    }

    @Override
    public EsgQuestionDTO getQuestioById(Long id) {
        Optional<EsgQuestion> question = esgQuestionRepo.findById(id);
        if (question.isPresent()) {
            EsgQuestionDTO dto = esgQuestionMapper.toDto(question.get());
            List<EsgOption> options = esgOptionService.findByEsgQuestionId(id);
            dto.setOptions(options.stream().map(esgOptionMapper::toDto).collect(Collectors.toList()));
            return dto;
        }
        return null;
    }

    @Override
    public List<EsgQuestionDTO> loadQuestionByCategoryWithOption(EsgCategory category) {
        return this.esgQuestionRepo.findByCategory(category).stream()
                .map(esgQuestionMapper::toDto)
                .collect(Collectors.toList());
    }



    @Override
    public void saveAll(List<EsgQuestion> questions) {
        esgQuestionRepo.saveAll(questions);
    }

    @Override
    public List<EsgQuestionDTO> getAll() {
        List<EsgQuestion> questions = esgQuestionRepo.findAll();
        return questions.stream()
                .map(question -> {
                    EsgQuestionDTO dto = esgQuestionMapper.toDto(question);
                    List<EsgOption> options = esgOptionService.findByEsgQuestionId(question.getId());
                    dto.setOptions(options.stream().map(esgOptionMapper::toDto).collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }
    }
