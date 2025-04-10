package com.ppp.Ecopilot.Controllers;
import com.ppp.Ecopilot.DTO.ProjectDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Mappers.ProjectMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import com.ppp.Ecopilot.Services.Implementations.ProjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController implements CrudController<Project,
        Long, ProjectDTO>{
    private final ProjectServiceImpl projectService;
    private final ProjectMapper projectMapper;
    @Override
    public AbstractCrudService<Project, Long> getService(){
        return projectService;
    };
    @Override
    public EntityMapper<Project, ProjectDTO> getMapper(){
        return projectMapper;
    };
    @PostMapping("/create")
    public ResponseEntity<Long> create(@RequestBody ProjectDTO projectDTO) {
        Project project = projectMapper.toEntity(projectDTO);
        Project saved = projectService.save(project);
        return ResponseEntity.ok(saved.getId());
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAll() {
        List<Project> projects = projectService.findAll();
        List<ProjectDTO> dtos = projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getById(@PathVariable Long id) {
        Project project = projectService.findById(id);
        return ResponseEntity.ok(projectMapper.toDto(project));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> update(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        Project toUpdate = projectMapper.toEntity(projectDTO);
        toUpdate.setId(id);
        Project updated = projectService.update(toUpdate);
        return ResponseEntity.ok(projectMapper.toDto(updated));
    }


    @GetMapping("/cost")
    public ResponseEntity<List<ProjectDTO>> getByCostLessThan(@RequestParam("max") int costMax) {
        List<Project> filtered = projectService.findByCostLessThan(costMax);
        List<ProjectDTO> dtos = filtered.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }


}
