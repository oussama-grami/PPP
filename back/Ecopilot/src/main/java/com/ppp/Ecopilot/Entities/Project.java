package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
public class Project extends BaseEntity<Long> {
    private int availableStock;
    private String category;
    private int cost;
    private String country;
    private String flag;
    private String Mechanism;
    private int minimumPurchase;
    private String name;
    private String routing;
    private String typeOfProject;
    private String Url;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectOwner_id")
    @JsonBackReference
    private ProjectOwner projectOwner;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chartLine_id")
    @JsonBackReference
    private ChartLine chartLine;

}