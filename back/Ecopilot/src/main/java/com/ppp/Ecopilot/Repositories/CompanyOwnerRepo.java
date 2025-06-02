package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.CompanyOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanyOwnerRepo extends JpaRepository<CompanyOwner, Long> {

    CompanyOwner findByKeycloakId(String keycloakId);
    Boolean existsByKeycloakId(String keycloakId);
}
