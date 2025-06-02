package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


@Service

public class CompanyOwnerServiceImpl extends AbstractCrudService<CompanyOwner, Long> implements CompanyOwnerService {

    private final CompanyOwnerRepo companyOwnerRepo;

    public CompanyOwnerServiceImpl(CompanyOwnerRepo companyOwnerRepo) {
        this.companyOwnerRepo = companyOwnerRepo;
    }

    @Override
    protected JpaRepository<CompanyOwner, Long> getRepository() {
        return companyOwnerRepo;
    }

    @Override
    protected Class<CompanyOwner> getEntityClass() {
        return CompanyOwner.class;
    }

    public CompanyOwner findByKeycloakId(String keycloakId){
        CompanyOwner companyOwner = companyOwnerRepo.findByKeycloakId(keycloakId);
        if (companyOwner == null) {
            throw new RuntimeException("Company owner not found with Keycloak ID: " + keycloakId);
        }
        return companyOwner;
    }

    @Override
    public Boolean existsByKeycloakId(String keycloakId) {
        return companyOwnerRepo.existsByKeycloakId(keycloakId);
    }

    @Override
    public Long AddCompanyOwner(CompanyOwner companyOwner) {
        return companyOwnerRepo.save(companyOwner).getId();
    }
}
