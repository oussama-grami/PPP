/*package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Mappers.ProjectOwnerMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import com.ppp.Ecopilot.Services.Implementations.ProjectOwnerServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/project-owners")
@RequiredArgsConstructor
public class ProjectOwnerController implements CrudController<ProjectOwner,
        Long, ProjectOwnerDTO> {
    private final ProjectOwnerServiceImpl service;
    private final ProjectOwnerMapper projectOwnerMapper;

    @Override
    public AbstractCrudService<ProjectOwner, Long> getService() {
        return service;
    }

    @Override
    public EntityMapper<ProjectOwner, ProjectOwnerDTO> getMapper() {
        return projectOwnerMapper;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createWithProject(@RequestBody @Valid ProjectOwnerDTO dto) {
        var entity = getMapper().toEntity(dto);
        var project = Project.builder()
                .cost(5)
                .name("Project 1")
                .mechanism("Mechanism 1")
                .availableStock(5)
                .category("Category 1")
                .chartLines(new ArrayList<>((Collection) new ChartLine()))
                .flag("hello flag")
                .name("Project 2")
                .routing("routing")
                .minimumPurchase(555)
                .build();
        entity.setProjects(new ArrayList<>());
        entity.getProjects().add(project);
        project.setProjectOwner(entity);
        var savedEntity = getService().save(entity);
        return ResponseEntity.ok(savedEntity.getId());
    }
}
*/