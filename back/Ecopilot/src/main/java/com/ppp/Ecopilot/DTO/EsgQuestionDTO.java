package com.ppp.Ecopilot.DTO;

import com.ppp.Ecopilot.Enums.EsgCategory;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
@MappedSuperclass
@SuperBuilder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EsgQuestionDTO {
    private Long Id;
    private String text;
    private EsgCategory category;
    private List<EsgOptionDTO> options;

}
