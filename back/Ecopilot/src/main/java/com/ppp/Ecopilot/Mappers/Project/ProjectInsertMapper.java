package com.ppp.Ecopilot.Mappers.Project;

import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class ProjectInsertMapper implements EntityMapper<Project, ProjectInsertDTO> {

    public Project toEntity(ProjectInsertDTO dto) {
        Project.ProjectBuilder builder = Project.builder()
                .certified(dto.isCertified())
                .availableStock(dto.getAvailableStock())
                .category(dto.getCategory())
                .cost(dto.getCost())
                .country(dto.getCountry())
                .flag(dto.getFlag())
                .mechanism(dto.getMechanism())
                .minimumPurchase(dto.getMinimumPurchase())
                .name(dto.getName())
                .routing(dto.getRouting())
                .description(dto.getDescription())
                .typeOfProject(dto.getTypeOfProject())
                .url(dto.getUrl())
                .mapUrl(dto.getMapUrl())
                .imageUrl1(dto.getImageUrl1())
                .imageUrl2(dto.getImageUrl2())
                .imageUrl3(dto.getImageUrl3())
                .imageUrl4(dto.getImageUrl4())
                .estimation(dto.getEstimation())
                .estimationValue(dto.getEstimationValue())
                .projectOwner(ProjectOwner.builder().id(dto.getProjectOwnerId()).build());

        return builder.build();
    }

    public ProjectInsertDTO toDto(Project entity) {
        return ProjectInsertDTO.builder()
                .certified(entity.isCertified())
                .availableStock(entity.getAvailableStock())
                .category(entity.getCategory())
                .cost(entity.getCost())
                .country(entity.getCountry())
                .flag(entity.getFlag())
                .mechanism(entity.getMechanism())
                .minimumPurchase(entity.getMinimumPurchase())
                .name(entity.getName())
                .routing(entity.getRouting())
                .typeOfProject(entity.getTypeOfProject())
                .url(entity.getUrl())
                .mapUrl(entity.getMapUrl())
                .imageUrl1(entity.getImageUrl1())
                .imageUrl2(entity.getImageUrl2())
                .imageUrl3(entity.getImageUrl3())
                .imageUrl4(entity.getImageUrl4())
                .projectOwnerId(entity.getProjectOwner().getId())
                .description(entity.getDescription())
                .estimation(entity.getEstimation())
                .estimationValue(entity.getEstimationValue())
                .build();
    }
}

