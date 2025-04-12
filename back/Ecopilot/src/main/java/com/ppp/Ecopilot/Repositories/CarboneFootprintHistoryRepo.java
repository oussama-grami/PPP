package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Entities.CarboneFootprintHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


public interface CarboneFootprintHistoryRepo extends JpaRepository<CarboneFootprintHistory, Long> {
    List<CarboneFootprintHistory> findByCompanyOwnerIdOrderByDateAsc(Long id);
    List<CarboneFootprintHistory> findByCompanyOwnerIdAndDateBetweenOrderByDateAsc(Long id, Date startDate, Date endDate);

}
