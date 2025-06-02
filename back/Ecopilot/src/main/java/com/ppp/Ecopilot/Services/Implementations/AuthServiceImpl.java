package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.KeycloakUser;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements com.ppp.Ecopilot.Services.AuthService {
    private final CompanyOwnerService companyOwnerService;
    public KeycloakUser getCurrentUser() {
        Jwt user = getJwt();
        String username = user.getClaimAsString("preferred_username");
        String email = user.getClaimAsString("email");
        String firstName = user.getClaimAsString("given_name");
        String lastName = user.getClaimAsString("family_name");
        String id = user.getClaimAsString("sub");
        Boolean emailVerified = user.getClaimAsBoolean("email_verified");

        return new KeycloakUser(
                id,
                emailVerified,
                email,
                username,
                firstName,
                lastName
        );
    }
    public CompanyOwner getCurrentCompanyOwner() {
        String keycloakId = Optional.ofNullable(getCurrentUser())
                .map(KeycloakUser::keycloak_id)
                .orElseThrow(() -> new RuntimeException("User not authenticated"));
        System.out.println("Keycloak ID: " + keycloakId);
        CompanyOwner companyOwner = companyOwnerService.findByKeycloakId(keycloakId);
        if (companyOwner == null) {
            throw new RuntimeException("Company owner not found in the database");
        }

        return companyOwner;
    }


    private static Jwt getJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            throw new RuntimeException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof Jwt)) {
            throw new RuntimeException("Authentication is not JWT-based");
        }
        Jwt user = (Jwt) authentication.getPrincipal();
        return user;
    }
}
