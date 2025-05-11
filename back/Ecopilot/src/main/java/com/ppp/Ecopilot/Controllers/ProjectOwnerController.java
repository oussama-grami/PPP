package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.ProjectOwnerMapper;
import com.ppp.Ecopilot.Services.ProjectOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project-owners")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectOwnerController {
    
    private final ProjectOwnerService projectOwnerService;
    private final ProjectOwnerMapper projectOwnerMapper;
    
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody @Valid ProjectOwnerDTO dto) {
        ProjectOwner entity = projectOwnerMapper.toEntity(dto);
        ProjectOwner savedEntity = projectOwnerService.save(entity);
        return ResponseEntity.ok(savedEntity.getId());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProjectOwnerDTO> getById(@PathVariable Long id) {
        ProjectOwner projectOwner = projectOwnerService.findById(id);
        return ResponseEntity.ok(projectOwnerMapper.toDto(projectOwner));
    }
}