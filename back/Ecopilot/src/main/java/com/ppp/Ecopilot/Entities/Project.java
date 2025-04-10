package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.*;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Project extends BaseEntity<Long> {
    @Column(nullable = false)
    private boolean certified;
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
    private String Url;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectOwner_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ProjectOwner projectOwner;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ChartLine> chartLines;

    @JsonProperty("projectOwnerId")
    public Long getProjectOwnerId() {
        return projectOwner != null ? projectOwner.getId() : null;
    }

    @JsonProperty("chartLineIds")
    public List<Long> getChartLineIds() {
        if (chartLines == null) {
            return null;
        }
        return chartLines.stream()
                .map(BaseEntity::getId)
                .toList();
    }

}