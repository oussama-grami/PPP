package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionDTO;
import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.Transaction;
import com.ppp.Ecopilot.Mappers.Transaction.TransactionInsertMapper;
import com.ppp.Ecopilot.Mappers.Transaction.TransactionMapper;
import com.ppp.Ecopilot.Models.PaymentRequest;
import com.ppp.Ecopilot.Models.PaymentResponse;
import com.ppp.Ecopilot.Repositories.ChartLineRepo;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Repositories.TransactionRepo;
import com.ppp.Ecopilot.Services.TransactionService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl extends AbstractCrudService<Transaction,Long> implements  TransactionService {

    @Value("${stripe.public.key}")
    private String stripePublicKey;
    private final TransactionRepo transactionRepo;
    private final TransactionInsertMapper transactionInsertMapper;
    private final TransactionMapper transactionMapper;
    private final CompanyOwnerRepo companyOwnerRepo;
    private final ChartLineRepo chartLineRepo;
    @Override
    public Transaction save(TransactionInsertDTO dto) {
        Optional<CompanyOwner> companyOwner = companyOwnerRepo.findById(dto.getCompanyOwnerId());
        if (companyOwner.isEmpty()) {
            throw new EntityNotFoundException("Company owner with ID " + dto.getCompanyOwnerId() + " does not exist.");
        }

        List<ChartLine> chartLines = chartLineRepo.findAllById(dto.getChartLineIds());
        /*System.out.println("Chartline size is "+chartLines.size()+" and dto size is "+dto.getChartLineIds().size());
        if (chartLines.size() != dto.getChartLineIds().size()) {
            throw new EntityNotFoundException("One or more ChartLine IDs do not exist.");
        }*/

        if (dto.getTotalPrice() == null || dto.getTotalPrice() == 0) {
            throw new IllegalArgumentException("Total price cannot be null or empty.");
        }

        if (dto.getCompanyOwnerId() == null) {
            throw new IllegalArgumentException("Company owner ID cannot be null.");
        }

        Transaction transaction = transactionInsertMapper.toEntity(dto);

        transaction =  transactionRepo.save(transaction);
        for (ChartLine chartLine : chartLines) {
            chartLine.setTransaction(transaction);
            chartLineRepo.save(chartLine);
        }return transaction;
    }



    protected  JpaRepository<Transaction, Long> getRepository(){
        return this.transactionRepo;
    }

    protected  Class<Transaction> getEntityClass(){
        return Transaction.class;
    }
    public Transaction updateDescription(Long id, String newDescription) {
         Transaction transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setDescription(newDescription);
        return transactionRepo.save(transaction);
    }
    public Page<TransactionDTO> getPaginatedTransactions(int skip, int limit) {
        Pageable pageable = PageRequest.of(skip, limit);
        Page<Transaction> transactionPage = transactionRepo.findAll(pageable);

        return transactionPage.map(transactionMapper::toDto);
    }

    public Map<String, String> paymentSuccess(String paymentIntentId){
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            System.out.println(paymentIntent.getMetadata());
            Map<String, String> response = new HashMap<>();
            if ("succeeded".equals(paymentIntent.getStatus())) {
                Map<String, String> metadata = paymentIntent.getMetadata();
                response.put("status", "success");
                response.put("message", "Paiement réussi");
                TransactionInsertDTO transactionInsertDTO = TransactionInsertDTO.builder()
                                .description("Success")
                                        .phone(metadata.get("phone"))
                        .city(metadata.get("city"))
                        .description("success")
                        .address(metadata.get("address"))
                        .country(metadata.get("country"))
                        .totalPrice(Float.valueOf(metadata.get("totalPrice")))
                        .phone(metadata.get("phone"))
                        .postalCode(Integer.valueOf(metadata.get("postalCode")))
                        .province(metadata.get("province"))
                        .companyOwnerId(Long.valueOf(metadata.get("companyOwnerId")))
                        .chartLineIds(Arrays.stream(metadata.get("chartLineIds").split(","))
                                .map(Long::valueOf)
                                .collect(Collectors.toList()))
                        .build();

                response.put("orderNumber",this.save(transactionInsertDTO).getId().toString());
                return response;
            } else {
                response.put("status", "error");
                response.put("message", "Le statut du paiement n'est pas 'succeeded'");
                return response;
            }
        } catch (StripeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Erreur lors du traitement du paiement: " + e.getMessage());
            throw new RuntimeException();
        }
    }
    public PaymentResponse createPaymentIntent(PaymentRequest paymentRequest){
        try {
            PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                    .setAmount(paymentRequest.getAmount())
                    .setCurrency(paymentRequest.getCurrency())
                    .setDescription(paymentRequest.getDescription())
                    .putMetadata("companyOwnerId", String.valueOf(paymentRequest.getCompanyOwnerId()));

            if (paymentRequest.getCartLineIds() != null) {
                for (int i = 0; i < paymentRequest.getCartLineIds().length; i++) {
                    paramsBuilder.putMetadata("cartItemId_" + i, String.valueOf(paymentRequest.getCartLineIds()[i]));
                }
            }

            if (paymentRequest.getCustomerInfo() != null) {
                paramsBuilder.putMetadata("email", paymentRequest.getCustomerInfo().getEmail())
                        .putMetadata("address", paymentRequest.getCustomerInfo().getAddress())
                        .putMetadata("city", paymentRequest.getCustomerInfo().getCity())
                        .putMetadata("postalCode", paymentRequest.getCustomerInfo().getPostalCode())
                        .putMetadata("country", paymentRequest.getCustomerInfo().getCountry())
                        .putMetadata("phone", paymentRequest.getCustomerInfo().getPhone())
                        .putMetadata("province", paymentRequest.getCustomerInfo().getProvince())
                        .putMetadata("totalPrice",paymentRequest.getTotalPrice())
                        .putMetadata("companyOwnerId", String.valueOf(paymentRequest.getCompanyOwnerId()))
                        .putMetadata("chartLineIds", String.join(",",
                                Arrays.stream(paymentRequest.getCartLineIds())
                                        .map(String::valueOf)
                                        .toList()));
            }
            PaymentIntent paymentIntent = PaymentIntent.create(paramsBuilder.build());
            PaymentResponse response = new PaymentResponse();
            response.setClientSecret(paymentIntent.getClientSecret());
            response.setPublicKey(stripePublicKey);
            return response;
        } catch (StripeException e) {
            throw new RuntimeException();
        }
    }
}
