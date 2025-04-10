package com.ppp.Ecopilot.DTO;

import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Optional;
@Data
@SuperBuilder
@NoArgsConstructor
public class ProjectDTO{
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
    private String Url;
    private ProjectOwner projectOwner;
    private Optional<List<ChartLine>> chartLines;
}
