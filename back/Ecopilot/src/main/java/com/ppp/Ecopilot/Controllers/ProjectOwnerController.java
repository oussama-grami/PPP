package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Mappers.ProjectOwnerMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import com.ppp.Ecopilot.Services.Implementations.ProjectOwnerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/candidats")
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
}
