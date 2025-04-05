package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class ProjectOwnerMapper implements EntityMapper<ProjectOwner, ProjectOwnerDTO> {
    @Override
    public ProjectOwner toEntity(ProjectOwnerDTO dto) {
        return ProjectOwner.builder()
                .certified(dto.isCertified())
                .company(dto.getCompany())
                .companyIdentifier(dto.getCompanyIdentifier())
                .description(dto.getDescription())
                .estimation(dto.getEstimation())
                .estimationValue(dto.getEstimationValue())
                .firstname(dto.getFirstname())
                .job_function(dto.getJob_function())
                .phone(dto.getPhone())
                .region(dto.getRegion())
                .website(dto.getWebsite())
                .Projects(dto.getProjectIds().stream().map(id -> Project.builder()
                        .id(id)
                        .build()).collect(Collectors.toCollection(ArrayList::new)))
                .build();
    }

    @Override
    public ProjectOwnerDTO toDto(ProjectOwner entity) {
        return ProjectOwnerDTO.builder()
                .certified(entity.isCertified())
                .company(entity.getCompany())
                .companyIdentifier(entity.getCompanyIdentifier())
                .description(entity.getDescription())
                .estimation(entity.getEstimation())
                .estimationValue(entity.getEstimationValue())
                .firstname(entity.getFirstname())
                .job_function(entity.getJob_function())
                .phone(entity.getPhone())
                .region(entity.getRegion())
                .website(entity.getWebsite())
                .ProjectIds(entity.getProjects().stream().map(Project::getId)
                        .collect(Collectors.toCollection(ArrayList::new)))
                .build();
    }
}
