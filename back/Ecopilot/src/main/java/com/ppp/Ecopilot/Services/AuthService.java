package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.KeycloakUser;
import org.springframework.security.core.Authentication;

public interface AuthService {
    public KeycloakUser getCurrentUser();
}
