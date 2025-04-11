package com.ppp.Ecopilot.Mappers.Project;

import com.ppp.Ecopilot.DTO.Project.ProjectUpdateDTO;
import com.ppp.Ecopilot.Entities.Project;
import org.springframework.stereotype.Service;

@Service
public class ProjectUpdateMapper{
    public void updateEntityFromDTO(ProjectUpdateDTO dto, Project entity) {
        if (dto.getCertified() != null) {
            entity.setCertified(dto.getCertified());
        }
        if (dto.getAvailableStock() != null) {
            entity.setAvailableStock(dto.getAvailableStock());
        }
        if (dto.getCategory() != null) {
            entity.setCategory(dto.getCategory());
        }
        if (dto.getCost() != null) {
            entity.setCost(dto.getCost());
        }
        if (dto.getCountry() != null) {
            entity.setCountry(dto.getCountry());
        }
        if (dto.getFlag() != null) {
            entity.setFlag(dto.getFlag());
        }
        if (dto.getMechanism() != null) {
            entity.setMechanism(dto.getMechanism());
        }
        if (dto.getMinimumPurchase() != null) {
            entity.setMinimumPurchase(dto.getMinimumPurchase());
        }
        if (dto.getName() != null) {
            entity.setName(dto.getName());
        }
        if (dto.getRouting() != null) {
            entity.setRouting(dto.getRouting());
        }
        if (dto.getTypeOfProject() != null) {
            entity.setTypeOfProject(dto.getTypeOfProject());
        }
        if (dto.getUrl() != null) {
            entity.setUrl(dto.getUrl());
        }
    }
}
