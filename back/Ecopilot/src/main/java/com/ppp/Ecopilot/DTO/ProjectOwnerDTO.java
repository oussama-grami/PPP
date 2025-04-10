package com.ppp.Ecopilot.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor

public class ProjectOwnerDTO extends UserDTO {
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
    private Optional<List<Long>> ProjectIds;
}
