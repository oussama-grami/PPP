package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Repositories.ProjectOwnerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectOwnerServiceImpl extends AbstractCrudService<ProjectOwner,
        Long> implements com.ppp.Ecopilot.Services.ProjectOwnerService {
    private final ProjectOwnerRepo projectOwnerRepo;

    @Override
    protected JpaRepository<ProjectOwner, Long> getRepository() {
        return projectOwnerRepo;
    }

    @Override
    protected Class<ProjectOwner> getEntityClass() {
        return ProjectOwner.class;
    }
}
