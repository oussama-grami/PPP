package com.ppp.Ecopilot.Repositories;

import com.ppp.Ecopilot.Entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {

}
