package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.DTO.CompanyOwnerDTO;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Enums.Roles;
import org.springframework.stereotype.Service;

@Service
public class CompanyOwnerMapper implements EntityMapper<CompanyOwner, CompanyOwnerDTO> {

    @Override
    public CompanyOwner toEntity(CompanyOwnerDTO dto) {
        return CompanyOwner.builder()
                .role(Roles.ROLE_CEO)
                .country(dto.country())
                .companyCode(dto.companyCode())
                .numTelephone(dto.numTelephone())
                .companyName(dto.companyName())
                .email(dto.email())
                .domaine(dto.domaine())
                .nom(dto.firstName()+" "+dto.lastName())
                .build();
    }

    @Override
    public CompanyOwnerDTO toDto(CompanyOwner entity) {
        return null;
    }
}
