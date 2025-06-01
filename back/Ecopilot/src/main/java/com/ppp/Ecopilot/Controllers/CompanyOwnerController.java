package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.ProjectOwnerDTO;
import com.ppp.Ecopilot.Entities.ProjectOwner;
import com.ppp.Ecopilot.Mappers.ProjectOwnerMapper;
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
    private final ProjectOwnerMapper projectOwnerMapper;
    private final AuthService authService;

    /*@PostMapping
    public ResponseEntity<Long> create(@RequestBody @Valid ProjectOwnerDTO dto) {
        ProjectOwner entity = projectOwnerMapper.toEntity(dto);
        ProjectOwner savedEntity = service.save(entity);
        return ResponseEntity.ok(savedEntity.getId());
    }*/

    @GetMapping()
    public ResponseEntity<Boolean> existsCompanyOwner() {
        return ResponseEntity.ok(service.existsByKeycloakId(authService.getCurrentUser().keycloak_id()));
    }
}