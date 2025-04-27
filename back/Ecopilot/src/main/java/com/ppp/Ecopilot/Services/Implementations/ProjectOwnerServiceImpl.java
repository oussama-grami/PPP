package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Repositories.ProjectOwnerRepo;
import com.ppp.Ecopilot.Services.ProjectOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectOwnerServiceImpl extends AbstractCrudService<ProjectOwner, Long> implements ProjectOwnerService {
    
    private final ProjectOwnerRepo projectOwnerRepo;

    @Override
    protected JpaRepository<ProjectOwner, Long> getRepository() {
        return projectOwnerRepo;
    }

    @Override
    protected Class<ProjectOwner> getEntityClass() {
        return ProjectOwner.class;
    }
    
    @Override
    public ProjectOwner save(ProjectOwner projectOwner) {
        return projectOwnerRepo.save(projectOwner);
    }

    @Override
    public ProjectOwner findById(Long id) {
        return projectOwnerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("ProjectOwner not found with id: " + id));
    }
}
