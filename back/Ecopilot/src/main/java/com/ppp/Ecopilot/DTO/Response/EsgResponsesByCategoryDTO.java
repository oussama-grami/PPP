package com.ppp.Ecopilot.DTO.Response;


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

