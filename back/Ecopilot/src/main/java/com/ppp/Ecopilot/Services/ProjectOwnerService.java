package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.Entities.ProjectOwner;

public interface ProjectOwnerService extends CRUDService<ProjectOwner, Long> {
    ProjectOwner save(ProjectOwner projectOwner);
    ProjectOwner findById(Long id);
}
