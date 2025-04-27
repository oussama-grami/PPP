package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data()
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ProjectOwner extends User {
    @Column(nullable = false)
    private boolean certified;
    @Column(nullable = false)
    private String company;
    @Column(nullable = false)
    private String companyIdentifier;
    @Column(nullable = false)
    private String description;
    @Column()
    private boolean estimation = false;
    @Column(nullable = false)
    private float estimationValue;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String job_function;
    @Column(nullable = false, unique = true)
    private String phone;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String website;
    @OneToMany(mappedBy = "projectOwner", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Project> Projects;

}