package com.ppp.Ecopilot.DTO;

public record CompanyOwnerDTO(
        int country,
        String companyName,
        String companyCode,
        String email,
        String domaine,
        Double numTelephone,
        String firstName,
        String lastName,
        String role
) {
}
