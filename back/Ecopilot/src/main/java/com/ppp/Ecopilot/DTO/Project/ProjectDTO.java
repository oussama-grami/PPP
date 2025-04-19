package com.ppp.Ecopilot.DTO.Project;

import com.ppp.Ecopilot.DTO.BaseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Optional;
@Data
@SuperBuilder
@NoArgsConstructor
public class ProjectDTO extends BaseDTO {
    private boolean certified;
    private int availableStock;
    private String category;
    private int cost;
    private String country;
    private String flag;
    private String mechanism;
    private int minimumPurchase;
    private String name;
    private String routing;
    private String typeOfProject;
    private String url;
    private Long projectOwnerId;
    private String mapUrl;
    private Optional<List<Long>> chartLinesIds;
}
