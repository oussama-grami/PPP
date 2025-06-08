package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProjectRepo extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
    Project findByName(String name);
    Project findByCertified(boolean certified);
    Project findByCategory(String category);
    Project findByMechanism(String mechanism);
    Project findByCost(int cost);
    Project findByCountry(String country);
    List<Project> findByCostLessThan(int costMax);
}
