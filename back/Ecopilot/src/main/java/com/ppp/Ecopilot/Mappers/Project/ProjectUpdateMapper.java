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
        if(dto.getDescription() != null){
            entity.setDescription(dto.getDescription());
        }
        if(dto.getMapUrl() != null){
            entity.setMapUrl(dto.getMapUrl());
        }
        // Handle image URLs
        if(dto.getImageUrl1() != null){
            entity.setImageUrl1(dto.getImageUrl1());
        }
        if(dto.getImageUrl2() != null){
            entity.setImageUrl2(dto.getImageUrl2());
        }
        if(dto.getImageUrl3() != null){
            entity.setImageUrl3(dto.getImageUrl3());
        }
        if(dto.getImageUrl4() != null){
            entity.setImageUrl4(dto.getImageUrl4());
        }
        // Handle estimation fields
        if(dto.getEstimation() != null){
            entity.setEstimation(dto.getEstimation());
        }
        if(dto.getEstimationValue() != null){
            entity.setEstimationValue(dto.getEstimationValue());
        }
    }
}
