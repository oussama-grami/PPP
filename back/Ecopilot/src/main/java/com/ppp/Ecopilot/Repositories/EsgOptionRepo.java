package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.EsgOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EsgOptionRepo extends JpaRepository<EsgOption, Long> {

    List<EsgOption> findByEsgQuestionId(Long esgQuestionId);


}
