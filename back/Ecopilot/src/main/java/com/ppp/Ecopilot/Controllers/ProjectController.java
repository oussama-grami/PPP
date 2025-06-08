package com.ppp.Ecopilot.Controllers;
import com.ppp.Ecopilot.DTO.Project.ProjectDTO;
import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.DTO.Project.ProjectUpdateDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Mappers.Project.ProjectMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import com.ppp.Ecopilot.Services.Implementations.ProjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor

public class ProjectController {
    private final ProjectServiceImpl projectService;
    private final ProjectMapper projectMapper;

    public AbstractCrudService<Project, Long> getService(){
        return projectService;
    };

    public EntityMapper<Project, ProjectDTO> getMapper(){
        return projectMapper;
    };
    @PostMapping("/create")
    public ResponseEntity<Long> create(@RequestBody ProjectInsertDTO projectDTO) {
        System.out.println(projectDTO.toString());
        Project saved = projectService.save(projectDTO);
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
    public ResponseEntity<ProjectDTO> update(@PathVariable Long id, @RequestBody ProjectUpdateDTO projectUpdateDTO) {
        Project updated = projectService.update(projectUpdateDTO,id);
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Project>> searchProjects(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean certified,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String mechanism,
            @RequestParam(required = false) Integer cost,
            @RequestParam(required = false) String country) {

        List<Project> results = projectService.searchProjects(name, certified, category, mechanism, cost, country);
        return ResponseEntity.ok(results);
    }
    @GetMapping("/paginated")
    public Page<Project> getPaginatedProjects(
            @RequestParam(defaultValue = "0") int skip,
            @RequestParam(defaultValue = "10") int limit) {
        return projectService.getPaginatedProjects(skip-1, limit);
    }


    @PostMapping("/decrease/{id}")
    public ResponseEntity<ProjectDTO> decreaseStock(@PathVariable Long id, @RequestParam int quantity) {
        System.out.println("in controller");
        projectService.decreaseAmount(id, quantity);
        return ResponseEntity.ok(projectMapper.toDto(projectService.findById(id)));
    }



}
