package com.ppp.Ecopilot.Services.Implementations;
import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.DTO.Project.ProjectUpdateDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.Project.ProjectInsertMapper;
import com.ppp.Ecopilot.Mappers.Project.ProjectMapper;
import com.ppp.Ecopilot.Mappers.Project.ProjectUpdateMapper;
import com.ppp.Ecopilot.Repositories.ProjectOwnerRepo;
import com.ppp.Ecopilot.Repositories.ProjectRepo;
import com.ppp.Ecopilot.Specifications.ProjectSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl extends AbstractCrudService<Project, Long> implements com.ppp.Ecopilot.Services.ProjectService {
    private final ProjectRepo projectRepo;
    private final ProjectUpdateMapper projectUpdateMapper;
    private final ProjectOwnerRepo projectOwnerRepo;
    private final ProjectMapper projectMapper;
    private final ProjectInsertMapper projectInsertMapper;

    @Override
    protected JpaRepository<Project, Long> getRepository() {
        return projectRepo;
    }

    @Override
    protected Class<Project> getEntityClass() {
        return Project.class;
    }

    @Override
    public Project update(ProjectUpdateDTO projectUpdateDTO, Long id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectUpdateMapper.updateEntityFromDTO(projectUpdateDTO, project);
        return projectRepo.save(project);
    }
    @Override
    public List<Project> findByCostLessThan(int costMax) {
        return projectRepo.findByCostLessThan(costMax);
    }
    @Override
    public Project save(ProjectInsertDTO dto){
        ProjectOwner owner = projectOwnerRepo.findById(dto.getProjectOwnerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        " Project Owner not found with id: " + dto.getProjectOwnerId()));
        Project project = projectInsertMapper.toEntity(dto);
        project.setProjectOwner(owner);

        return projectRepo.save(project);
    }
    @Override
    public List<Project> searchProjects(String name, Boolean certified, String category, String mechanism, Integer cost, String country) {
        Specification<Project> spec = Specification
                .where(ProjectSpecification.hasName(name))
                .and(ProjectSpecification.hasCertified(certified))
                .and(ProjectSpecification.hasCategory(category))
                .and(ProjectSpecification.hasMechanism(mechanism))
                .and(ProjectSpecification.hasCost(cost))
                .and(ProjectSpecification.hasCountry(country));

        return projectRepo.findAll(spec);
    }
    public Page<Project> getPaginatedProjects(int skip, int limit) {
        Pageable pageable = PageRequest.of(skip, limit);
        return projectRepo.findAll(pageable);
    }

}
