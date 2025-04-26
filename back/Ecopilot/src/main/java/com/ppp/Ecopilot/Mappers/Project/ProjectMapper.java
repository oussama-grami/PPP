package com.ppp.Ecopilot.Mappers.Project;

import com.ppp.Ecopilot.DTO.Project.ProjectDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectMapper implements EntityMapper<Project, ProjectDTO> {
    @Override
    public Project toEntity(ProjectDTO dto) {
        Project.ProjectBuilder builder = Project.builder()
                .id(dto.getId())
                .certified(dto.isCertified())
                .availableStock(dto.getAvailableStock())
                .category(dto.getCategory())
                .cost(dto.getCost())
                .country(dto.getCountry())
                .flag(dto.getFlag())
                .mechanism(dto.getMechanism())
                .minimumPurchase(dto.getMinimumPurchase())
                .name(dto.getName())
                .description(dto.getDescription())
                .routing(dto.getRouting())
                .typeOfProject(dto.getTypeOfProject())
                .url(dto.getUrl())
                .projectOwner(ProjectOwner.builder().id(dto.getProjectOwnerId()).build());
        // Optionnel : si tu veux mapper les IDs vers des entités "vides" avec juste l'ID
        if (dto.getChartLinesIds().isPresent()) {
            List<ChartLine> chartLines = dto.getChartLinesIds().get().stream()
                    .map(id -> {
                        ChartLine cl = new ChartLine();
                        cl.setId(id);
                        return cl;
                    })
                    .collect(Collectors.toList());
            builder.chartLines(chartLines);
        }

        return builder.build();
    }

    @Override
    public ProjectDTO toDto(Project entity) {
        Optional<List<Long>> chartLineIds = Optional.ofNullable(entity.getChartLines())
                .map(lines -> lines.stream()
                        .map(ChartLine::getId)
                        .collect(Collectors.toList()));

        return ProjectDTO.builder()
                .id(entity.getId())
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
                .description(entity.getDescription())
                .url(entity.getUrl())
                .mapUrl(entity.getMapUrl())
                .projectOwnerId(entity.getProjectOwner().getId())
                .chartLinesIds(chartLineIds)
                .build();
    }
}
