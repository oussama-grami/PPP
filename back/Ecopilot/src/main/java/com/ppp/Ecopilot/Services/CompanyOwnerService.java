package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.Entities.CompanyOwner;


public interface CompanyOwnerService extends CRUDService<CompanyOwner, Long> {
    Boolean existsByKeycloakId(String keycloakId);
    CompanyOwner findByKeycloakId(String keycloakId);

    Long AddCompanyOwner(CompanyOwner companyOwner);
}
