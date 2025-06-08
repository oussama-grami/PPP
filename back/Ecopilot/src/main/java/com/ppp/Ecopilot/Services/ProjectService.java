package com.ppp.Ecopilot.Services;


import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.DTO.Project.ProjectUpdateDTO;
import com.ppp.Ecopilot.Entities.Project;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProjectService extends CRUDService<Project, Long> {
    Project save(ProjectInsertDTO dto);
    Project findById(Long id);
    Project update(ProjectUpdateDTO project, Long id);
    void deleteById(Long id);
    List<Project> findAll();
    List<Project> findByCostLessThan(int costMax);
    List<Project> searchProjects(String name, Boolean certified, String category, String mechanism, Integer cost, String country);
    public Page<Project> getPaginatedProjects(int skip, int limit);
    void decreaseAmount(Long projectId, int amountToDecrease);
}
