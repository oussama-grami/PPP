package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Optional;
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
                .estimation(dto.isEstimation())
                .estimationValue(dto.getEstimationValue())
                .firstname(dto.getFirstname())
                .job_function(dto.getJob_function())
                .phone(dto.getPhone())
                .region(dto.getRegion())
                .website(dto.getWebsite())
                .email(dto.getEmail())
                .nom(dto.getNom())
                .password(dto.getPassword())
                .Projects(dto.getProjectIds() != null && dto.getProjectIds().isPresent() ?
                        dto.getProjectIds().get().stream().map(id -> Project.builder()
                                .id(id)
                                .build()).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }

    @Override
    public ProjectOwnerDTO toDto(ProjectOwner entity) {
        return ProjectOwnerDTO.builder()
                .id(entity.getId())
                .certified(entity.isCertified())
                .company(entity.getCompany())
                .companyIdentifier(entity.getCompanyIdentifier())
                .description(entity.getDescription())
                .estimation(entity.isEstimation())
                .estimationValue(entity.getEstimationValue())
                .firstname(entity.getFirstname())
                .job_function(entity.getJob_function())
                .phone(entity.getPhone())
                .region(entity.getRegion())
                .website(entity.getWebsite())
                .email(entity.getEmail())
                .nom(entity.getNom())
                .password(entity.getPassword())
                .ProjectIds(Optional.ofNullable(entity.getProjects())
                        .map(projects -> projects.stream()
                                .map(Project::getId)
                                .collect(Collectors.toList())))
                .build();
    }
}
