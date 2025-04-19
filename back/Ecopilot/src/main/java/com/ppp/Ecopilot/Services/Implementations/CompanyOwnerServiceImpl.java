package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class CompanyOwnerServiceImpl extends AbstractCrudService<CompanyOwner, Long> implements CompanyOwnerService {

    private final CompanyOwnerRepo companyOwnerRepo;

    public CompanyOwnerServiceImpl(CompanyOwnerRepo companyOwnerRepo) {
        this.companyOwnerRepo = companyOwnerRepo;
    }

    @Override
    protected JpaRepository<CompanyOwner, Long> getRepository() {
        return  companyOwnerRepo;
    }

    @Override
    protected Class<CompanyOwner> getEntityClass() {
        return CompanyOwner.class;
    }




}
