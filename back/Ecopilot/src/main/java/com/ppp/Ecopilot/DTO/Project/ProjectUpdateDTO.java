package com.ppp.Ecopilot.DTO.Project;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class ProjectUpdateDTO {
    private Boolean certified;
    private Integer availableStock;
    private String category;
    private Integer cost;
    private String country;
    private String flag;
    private String mechanism;
    private Integer minimumPurchase;
    private String name;
    private String routing;
    private String typeOfProject;
    private String url;
}
