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
    private String description;
    private String routing;
    private String typeOfProject;
    private String url;
    private String mapUrl;     // URL for the map image
    private String urlImage;   // URL for the website image
    private String imageUrl1;  // URL for objective image 1
    private String imageUrl2;  // URL for objective image 2 
    private String imageUrl3;  // URL for objective image 3
    private String imageUrl4;  // URL for objective image 4
    private Boolean estimation;
    private Float estimationValue;
}
