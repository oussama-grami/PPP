package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.Response.EsgResponseDTO;
import com.ppp.Ecopilot.Entities.EsgResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EsgResponseMapper {

    public EsgResponseDTO toDto(EsgResponse esgResponse) {
        return new EsgResponseDTO(
                esgResponse.getEsgQuestion().getText(),
                esgResponse.getEsgOption().getText(),
                esgResponse.getEsgOption().getScore()
                
        );
    }

    public List<EsgResponseDTO> toDtoList(List<EsgResponse> esgResponses) {
        return esgResponses.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}