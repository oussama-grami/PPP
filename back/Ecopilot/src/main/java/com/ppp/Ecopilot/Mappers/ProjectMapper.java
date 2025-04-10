package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.ProjectDTO;
import com.ppp.Ecopilot.Entities.Project;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class ProjectMapper implements EntityMapper<Project, ProjectDTO>{
    @Override
    public Project toEntity(ProjectDTO dto) {
        return Project.builder()
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
                .typeOfProject(dto.getTypeOfProject())
                .Url(dto.getUrl())
                .projectOwner(dto.getProjectOwner())
                // Si le ChartLine est présent, on affecte l'entité, sinon null
                .chartLines(dto.getChartLines().orElse(null))
                .build();
    }

    @Override
    public ProjectDTO toDto(Project entity) {
        return ProjectDTO.builder()
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
                .Url(entity.getUrl())
                .projectOwner(entity.getProjectOwner())
                // Envelopper le chartLine dans un Optional pour respecter le type du DTO
                .chartLines(Optional.ofNullable(entity.getChartLines()))


                .build();
    }
}
