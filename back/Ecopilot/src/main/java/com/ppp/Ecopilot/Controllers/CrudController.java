package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.Entities.BaseEntity;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

public interface CrudController<T extends BaseEntity<ID>, ID, DTO> {
    AbstractCrudService<T, ID> getService();

    EntityMapper<T, DTO> getMapper();

    @PostMapping
    default ResponseEntity<ID> create(@RequestBody @Valid DTO dto) {
        T entity = getMapper().toEntity(dto);
        T savedEntity = getService().save(entity);
        return ResponseEntity.ok(savedEntity.getId());
    }

    @GetMapping
    default ResponseEntity<List<DTO>> getAll() {
        List<T> entities = getService().findAll();
        List<DTO> dtoOutputs = entities.stream()
                .map(getMapper()::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoOutputs);
    }

    @GetMapping("/{id}")
    default ResponseEntity<DTO> getById(@PathVariable ID id) {
        T entity = getService().findById(id);
        DTO dtoOutput = getMapper().toDto(entity);
        return ResponseEntity.ok(dtoOutput);
    }

    @DeleteMapping("/{id}")
    default ResponseEntity<Void> deleteById(@PathVariable ID id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

