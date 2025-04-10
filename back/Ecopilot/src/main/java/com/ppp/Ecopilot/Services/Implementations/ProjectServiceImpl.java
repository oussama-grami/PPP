package com.ppp.Ecopilot.Services.Implementations;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Repositories.ProjectRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl extends AbstractCrudService<Project, Long>
        implements com.ppp.Ecopilot.Services.ProjectService {
    private final ProjectRepo projectRepo;

    @Override
    protected JpaRepository<Project, Long> getRepository() {
        return projectRepo;
    }

    @Override
    protected Class<Project> getEntityClass() {
        return Project.class;
    }

    @Override
    public Project update(Project project) {
        if (!projectRepo.existsById(project.getId())) {
            throw new EntityNotFoundException("Projet avec ID " + project.getId() + " introuvable.");
        }
        return projectRepo.save(project);
    }
    @Override
    public List<Project> findByCostLessThan(int costMax) {
        return projectRepo.findByCostLessThan(costMax);
    }

}
