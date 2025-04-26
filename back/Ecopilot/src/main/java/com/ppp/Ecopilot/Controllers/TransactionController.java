package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionDTO;
import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Entities.Transaction;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import com.ppp.Ecopilot.Mappers.Transaction.TransactionInsertMapper;
import com.ppp.Ecopilot.Mappers.Transaction.TransactionMapper;
import com.ppp.Ecopilot.Services.Implementations.AbstractCrudService;
import com.ppp.Ecopilot.Services.Implementations.TransactionServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionServiceImpl transactionService;
    private final TransactionMapper entityMapper;
    public AbstractCrudService<Transaction, Long> getService(){
        return transactionService;
    }

    public EntityMapper<Transaction, TransactionDTO> getMapper(){
            return entityMapper;
    }
    @PostMapping("/create")
    public  ResponseEntity<Long> save(@RequestBody @Valid TransactionInsertDTO dto) {
       Transaction transaction = transactionService.save(dto);
        return ResponseEntity.ok(transaction.getId());
    }

    @PutMapping("/{id}/description")
    public ResponseEntity<Transaction> updateDescription(@PathVariable Long id, @RequestBody String description) {
        if(description != null && description.length()<40){
            Transaction updatedTransaction = transactionService.updateDescription(id, description);
            return ResponseEntity.ok(updatedTransaction);
        }
        return ResponseEntity.badRequest().body(null);
    }
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAll() {
        List<Transaction> entities = getService().findAll();
        List<TransactionDTO> dtoOutputs = entities.stream()
                .map(getMapper()::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoOutputs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getById(@PathVariable Long id) {
        Transaction entity = getService().findById(id);
        TransactionDTO dtoOutput = getMapper().toDto(entity);
        return ResponseEntity.ok(dtoOutput);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/paginated")
    public Page<TransactionDTO> getPaginatedProjects(
            @RequestParam(defaultValue = "1") int skip,
            @RequestParam(defaultValue = "10") int limit) {

        int page = Math.max(skip - 1, 0); // pour éviter les pages négatives
        return transactionService.getPaginatedTransactions(page, limit);
    }
}
