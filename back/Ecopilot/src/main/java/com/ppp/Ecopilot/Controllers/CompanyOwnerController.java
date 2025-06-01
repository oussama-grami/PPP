package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.CompanyOwnerDTO;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Mappers.CompanyOwnerMapper;
import com.ppp.Ecopilot.Services.AuthService;
import com.ppp.Ecopilot.Services.CompanyOwnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company-owners")
@RequiredArgsConstructor
public class CompanyOwnerController {

    private final CompanyOwnerService service;
    private final AuthService authService;
    private final CompanyOwnerMapper companyOwnerMapper;

    @PostMapping
    public ResponseEntity<Long> create(@RequestBody @Valid CompanyOwnerDTO dto) {
        System.out.println("Creating company owner with DTO: " + dto.toString());
        CompanyOwner companyOwner = companyOwnerMapper.toEntity(dto);
        companyOwner.setKeycloakId(authService.getCurrentUser().keycloak_id());
        return ResponseEntity.ok(service.AddCompanyOwner(companyOwner));
    }

    @GetMapping()
    public ResponseEntity<Boolean> existsCompanyOwner() {
        return ResponseEntity.ok(service.existsByKeycloakId(authService.getCurrentUser().keycloak_id()));
    }
}