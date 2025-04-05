package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Project extends BaseEntity<Long> {
    @Column(nullable = false)
    private int availableStock;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private int cost;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String flag;
    @Column(nullable = false)
    private String Mechanism;
    @Column(nullable = false)
    private int minimumPurchase;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String routing;
    @Column(nullable = false)
    private String typeOfProject;
    @Column(nullable = false)
    private String Url;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectOwner_id")
    private ProjectOwner projectOwner;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chartLine_id")
    private ChartLine chartLine;

}