package com.ppp.Ecopilot.DTO;

import com.ppp.Ecopilot.Entities.Project;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class ProjectOwnerDTO {
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
    private ArrayList<Long> ProjectIds;
}
