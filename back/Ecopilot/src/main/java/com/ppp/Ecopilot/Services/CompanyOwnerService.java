package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.Entities.CompanyOwner;


public interface CompanyOwnerService extends CRUDService<CompanyOwner, Long> {
    Boolean existsByKeycloakId(String keycloakId);

    void AddCompanyOwner(CompanyOwner companyOwner);
}
