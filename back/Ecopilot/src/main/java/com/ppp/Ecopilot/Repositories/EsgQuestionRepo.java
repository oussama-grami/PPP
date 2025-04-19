package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.EsgQuestion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ppp.Ecopilot.Enums.EsgCategory;

import java.util.List;


public interface EsgQuestionRepo extends JpaRepository<EsgQuestion, Long> {
    @EntityGraph(attributePaths = {"esgOptions"})
    List<EsgQuestion> findByCategory(EsgCategory esgCategory);

    @EntityGraph(attributePaths = {"esgOptions"})
    List<EsgQuestion> findAll();}
