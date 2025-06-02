package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.KeycloakUser;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import org.springframework.security.core.Authentication;

public interface AuthService {
    public KeycloakUser getCurrentUser();
    public CompanyOwner getCurrentCompanyOwner();
}
