package com.ppp.Ecopilot.Services;

import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionDTO;
import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.Transaction;
import com.ppp.Ecopilot.Models.PaymentRequest;
import com.ppp.Ecopilot.Models.PaymentResponse;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface TransactionService extends  CRUDService<Transaction, Long> {
    public Transaction updateDescription(Long id, String newDescription);
    public Transaction save(TransactionInsertDTO transactionInsertDTO);
    public Page<TransactionDTO> getPaginatedTransactions(int skip, int limit);
    Map<String, String> paymentSuccess(String paymentIntentId);
    PaymentResponse createPaymentIntent(PaymentRequest paymentRequest);
}
