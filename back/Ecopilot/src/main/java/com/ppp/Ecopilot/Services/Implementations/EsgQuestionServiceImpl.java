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

import java.util.List;
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
    protected JpaRepository<EsgQuestion, Long> getRepository() {
        return this.esgQuestionRepo;
    }

    @Override
    protected Class<EsgQuestion> getEntityClass() {
        return EsgQuestion.class;
    }

    @Override
    public EsgQuestionDTO getQuestionById(Long id) {
        EsgQuestion question = esgQuestionRepo.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        EsgQuestionDTO dto = esgQuestionMapper.toDto(question);
        List<EsgOption> options = esgOptionService.findByEsgQuestionId(id);
        dto.setOptions(options.stream().map(esgOptionMapper::toDto).collect(Collectors.toList()));
        return dto;


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
                    dto.setOptions(question.getEsgOptions().stream().map(esgOptionMapper::toDto).collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void saveQuestion(EsgQuestionDTO questionDTO) {
        EsgQuestion question = esgQuestionMapper.toEntity(questionDTO);
        List<EsgOption> options = questionDTO.getOptions().stream()
                .map(esgOptionMapper::toEntity)
                .collect(Collectors.toList());
        question.setEsgOptions(options);
        esgQuestionRepo.save(question);
    }

    @Override
    public void updateQuestion(EsgQuestionDTO questionDTO, Long id) {
        EsgQuestion question = esgQuestionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Update only non-null fields
        if (questionDTO.getText() != null) {
            question.setText(questionDTO.getText());
        }
        if (questionDTO.getCategory() != null) {
            question.setCategory(questionDTO.getCategory());
        }
        if (questionDTO.getOptions() != null) {
            List<EsgOption> options = questionDTO.getOptions().stream()
                    .map(esgOptionMapper::toEntity)
                    .collect(Collectors.toList());
            question.setEsgOptions(options);
        }

        esgQuestionRepo.save(question);
    }


}
