package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data()
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class ProjectOwner extends User {
    private boolean certified;
    private String company;
    private String companyIdentifier;
    private String description;
    private String estimation;
    private float estimationValue;
    private String firstname;
    private String job_function;
    private String phone;
    private String region;
    private String website;
    @OneToMany(mappedBy = "projectOwner")
    @JsonManagedReference
    private ArrayList<Project> Projects;

}