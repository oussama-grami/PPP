package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.Transaction;
import org.springframework.data.domain.Page;

public interface TransactionService extends  CRUDService<Transaction, Long> {
    public Transaction updateDescription(Long id, String newDescription);
    public Transaction save(TransactionInsertDTO transactionInsertDTO);
    public Page<Transaction> getPaginatedProjects(int skip, int limit);
}
