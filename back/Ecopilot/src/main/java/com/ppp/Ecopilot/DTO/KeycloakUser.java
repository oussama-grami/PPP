package com.ppp.Ecopilot.DTO;

import jakarta.validation.constraints.Email;

public record KeycloakUser(
        String keycloak_id,
        Boolean email_verified,
        String email,
        String username,
        String firstName,
        String lastName
) {
}
