package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.EventFootprintData;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventFootprintDataRepo extends JpaRepository<EventFootprintData, Long> {

    List<EventFootprintData> findByCompanyOwner(CompanyOwner companyOwner);
}
