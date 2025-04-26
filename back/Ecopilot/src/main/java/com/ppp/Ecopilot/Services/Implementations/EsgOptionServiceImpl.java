package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.EsgOptionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Repositories.EsgOptionRepo;
import com.ppp.Ecopilot.Services.EsgOptionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.ppp.Ecopilot.Mappers.EsgOptionMapper;

import java.util.List;

@Service
public class EsgOptionServiceImpl  implements EsgOptionService {

    private final  EsgOptionRepo esgOptionRepository;
    private final EsgOptionMapper esgOptionMapper;

    public EsgOptionServiceImpl(EsgOptionRepo esgOptionRepository, EsgOptionMapper esgOptionMapper) {
        this.esgOptionRepository = esgOptionRepository;
        this.esgOptionMapper = esgOptionMapper;
    }


    protected JpaRepository<EsgOption, Long> getRepository() {
        return esgOptionRepository;
    }

    protected Class<EsgOption> getEntityClass() {
        return EsgOption.class;
    }

    public List<EsgOption> findByEsgQuestionId(Long questionId) {
        return esgOptionRepository.findByEsgQuestionId(questionId);
    }

    @Override
    public EsgOptionDTO findById(Long id) {
        EsgOption esgOption = esgOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Option not found"));
        return esgOptionMapper.toDto(esgOption);

    }

    @Override
    public EsgOption findByIdEsgOption(Long id) {
        return this.esgOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Option not found"));
    }

    @Override
    public EsgOption save(EsgOptionDTO esgOptionDTO) {
        EsgOption esgOption = esgOptionMapper.toEntity(esgOptionDTO);
        EsgOption savedEsgOption = esgOptionRepository.save(esgOption);
        return esgOption;
    }

    @Override
    public EsgOption update(EsgOptionDTO esgOptionDTO, Long id) {
        EsgOption esgOption = esgOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Option not found"));
        esgOption.setText(esgOptionDTO.getText());
        esgOption.setScore(esgOptionDTO.getScore());
        return esgOptionRepository.save(esgOption);
    }

    @Override
    public void deleteById(Long id) {
        EsgOption esgOption = esgOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Option not found"));
        esgOptionRepository.delete(esgOption);

    }

    @Override
    public List<EsgOptionDTO> findAll() {
        List<EsgOption> esgOptions = esgOptionRepository.findAll();
        return esgOptions.stream()
                .map(esgOptionMapper::toDto)
                .toList();


    }


}
