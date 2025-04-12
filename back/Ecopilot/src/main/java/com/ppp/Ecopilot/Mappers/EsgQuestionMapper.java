package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.EsgOptionDTO;
import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;


@Service
public class EsgQuestionMapper implements EntityMapper<EsgQuestion, EsgQuestionDTO> {

    public EsgOptionDTO MapOptionsToDto(EsgOption option) {
        return new EsgOptionDTO(
                option.getId(),
                option.getText(),
                option.getScore()
        );
    }

    @Override
    public EsgQuestion toEntity(EsgQuestionDTO dto) {
        if (dto == null) {
            return null;
        }

        EsgQuestion question = new EsgQuestion();
        question.setId(dto.getId());
        question.setText(dto.getText());
        question.setEsgOptions(dto.getOptions().stream()
                .map(optionDto -> {
                    EsgOption option = new EsgOption();
                    option.setId(optionDto.getId());
                    option.setText(optionDto.getText());
                    option.setScore(optionDto.getScore());
                    return option;
                })
                .collect(Collectors.toList()));
        return question;
    }

    @Override
    public EsgQuestionDTO toDto(EsgQuestion entity) {
        if (entity == null) {
            return null;
        }

        EsgQuestionDTO dto = new EsgQuestionDTO();
        dto.setId(entity.getId());
        dto.setText(entity.getText());
        dto.setOptions(entity.getEsgOptions().stream()
                .map(this::MapOptionsToDto)
                .collect(Collectors.toList()));
        return dto;
    }
}