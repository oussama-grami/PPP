package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.ProjectOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectOwnerRepo extends JpaRepository<ProjectOwner, Long> {
    ProjectOwner findByEmail(String email);

    ProjectOwner findByNomLike(String nom);
}
