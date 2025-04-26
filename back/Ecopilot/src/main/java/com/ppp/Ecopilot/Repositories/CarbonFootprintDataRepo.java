package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarbonFootprintDataRepo extends JpaRepository<CarbonFootprintData, Long> {
    List<CarbonFootprintData> findByCompanyOwner_Id(Long ownerId);
}