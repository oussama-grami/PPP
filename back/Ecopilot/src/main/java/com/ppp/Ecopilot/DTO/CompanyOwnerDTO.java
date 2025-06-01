package com.ppp.Ecopilot.DTO;

public record CompanyOwnerDTO(
        int country,
        String companyName,
        String companyCode,
        String email,
        String domaine,
        int numTelephone,
        String role
) {
}
