package com.ppp.Ecopilot.DTO.Project;

import com.ppp.Ecopilot.DTO.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Optional;
@EqualsAndHashCode(callSuper = true)
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
    private String description;
    private String mapUrl;
    private String urlImage;
    private String imageUrl1;  // URL for objective image 1
    private String imageUrl2;  // URL for objective image 2
    private String imageUrl3;  // URL for objective image 3
    private String imageUrl4;  // URL for objective image 4
    private Boolean estimation;
    private float estimationValue;
    private Optional<List<Long>> chartLinesIds;
}
