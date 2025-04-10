package com.ppp.Ecopilot.Services;


import com.ppp.Ecopilot.Entities.Project;

import java.util.List;

public interface ProjectService extends CRUDService<Project, Long> {
    Project save(Project projectOwner);
    Project findById(Long id);
    Project update(Project project);
    void deleteById(Long id);
    List<Project> findAll();
    List<Project> findByCostLessThan(int costMax);
}
