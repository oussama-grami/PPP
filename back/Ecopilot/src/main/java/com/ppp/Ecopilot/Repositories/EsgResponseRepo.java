package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.EsgResponse;
import com.ppp.Ecopilot.Enums.EsgCategory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface EsgResponseRepo extends JpaRepository<EsgResponse, Long> {
    @EntityGraph(attributePaths = {"esgQuestion", "esgOption"})
    List<EsgResponse> findByEsgQuestionCategoryAndCompanyOwnerId(EsgCategory category, Long companyId);
    @EntityGraph(attributePaths = {"esgQuestion", "esgOption"})
    EsgResponse findByCompanyOwnerIdAndEsgQuestionId(long companyId , long questionId);

}
