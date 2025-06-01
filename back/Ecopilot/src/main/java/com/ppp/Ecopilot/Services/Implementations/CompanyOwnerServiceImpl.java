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


    @Override
    public Boolean existsByKeycloakId(String keycloakId) {
        return companyOwnerRepo.existsByKeycloakId(keycloakId);
    }

    @Override
    public Long AddCompanyOwner(CompanyOwner companyOwner) {
        return companyOwnerRepo.save(companyOwner).getId();
    }
}
