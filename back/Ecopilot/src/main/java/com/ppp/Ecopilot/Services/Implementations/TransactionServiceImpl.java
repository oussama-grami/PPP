package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.Transaction;
import com.ppp.Ecopilot.Mappers.Transaction.TransactionInsertMapper;
import com.ppp.Ecopilot.Repositories.ChartLineRepo;
import com.ppp.Ecopilot.Repositories.CompanyOwnerRepo;
import com.ppp.Ecopilot.Repositories.TransactionRepo;
import com.ppp.Ecopilot.Services.TransactionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl extends AbstractCrudService<Transaction,Long> implements  TransactionService {

    private final TransactionRepo transactionRepo;
    private final TransactionInsertMapper transactionInsertMapper;
    private final CompanyOwnerRepo companyOwnerRepo;
    private final ChartLineRepo chartLineRepo;
    @Override
    public Transaction save(TransactionInsertDTO dto) {
        Optional<CompanyOwner> companyOwner = companyOwnerRepo.findById(dto.getCompanyOwnerId());
        if (companyOwner.isEmpty()) {
            throw new EntityNotFoundException("Company owner with ID " + dto.getCompanyOwnerId() + " does not exist.");
        }

        List<ChartLine> chartLines = chartLineRepo.findAllById(dto.getChartLineIds());
        if (chartLines.size() != dto.getChartLineIds().size()) {
            throw new EntityNotFoundException("One or more ChartLine IDs do not exist.");
        }

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
    public Page<Transaction> getPaginatedProjects(int skip, int limit) {
        Pageable pageable = PageRequest.of(skip, limit);
        return transactionRepo.findAll(pageable);
    }
}
