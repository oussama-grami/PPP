package com.ppp.Ecopilot.DTO;


import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EsgResponsesByCategoryDTO {
    private EsgCategory category;
    private List<EsgResponseDTO> response;

    }

