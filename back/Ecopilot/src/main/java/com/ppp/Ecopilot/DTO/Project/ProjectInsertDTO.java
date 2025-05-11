package com.ppp.Ecopilot.DTO.Project;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class ProjectInsertDTO {
    private boolean certified;
    private int availableStock;
    private String category;
    private int cost;
    private String country;
    private String flag;
    private String description;
    private String mechanism;
    private int minimumPurchase;
    private String name;
    private String routing;
    private String typeOfProject;
    private String url;
    private Long projectOwnerId;
    private String mapUrl;     // URL for the map image
    private String imageUrl1;  // URL for objective image 1
    private String imageUrl2;  // URL for objective image 2
    private String imageUrl3;  // URL for objective image 3
    private String imageUrl4;  // URL for objective image 4
    private Boolean estimation;
    private float estimationValue;
}
