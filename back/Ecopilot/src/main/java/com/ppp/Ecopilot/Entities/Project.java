package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
@Entity
public class Project extends BaseEntity<Long> {
    @Column(nullable = false)
    private boolean certified;
    @Column(nullable = false)
    private int availableStock;//en ToCO2
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private int cost;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String flag;
    @Column(nullable = false)
    private String mechanism;
    @Column(nullable = false)
    private int minimumPurchase;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String routing;
    @Column(nullable = false)
    private String typeOfProject;
    @Column(nullable = false)
    private String url;
    @Column(nullable = true)
    private String mapUrl;
    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;
    private String imageUrl4;
    @Column()
    private boolean estimation = false;
    @Column(nullable = false)
    private float estimationValue;
    @Lob
    @Column(nullable = true, columnDefinition = "TEXT")
    private String description;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "projectOwner_id")
    @JsonIgnore
    private ProjectOwner projectOwner;
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ChartLine> chartLines;

}