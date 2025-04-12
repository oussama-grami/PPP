package com.ppp.Ecopilot.Mappers.Transaction;

import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionInsertDTO;
import com.ppp.Ecopilot.Entities.*;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionInsertMapper  implements EntityMapper<Transaction, TransactionInsertDTO> {

    public Transaction toEntity(TransactionInsertDTO dto){
        Transaction.TransactionBuilder builder = Transaction.builder()
                .description(dto.getDescription())
                .totalPrice(dto.getTotalPrice())
                .city(dto.getCity())
                .province(dto.getProvince())
                .country(dto.getCountry())
                .postalCode(dto.getPostalCode())
                .phone(dto.getPhone())
                .companyOwner(CompanyOwner.builder().id(dto.getCompanyOwnerId()).build());
        List<ChartLine> chartLines = dto.getChartLineIds().stream()
                .map(id -> {
                    ChartLine cl = new ChartLine();
                    cl.setId(id);
                    return cl;
                })
                .collect(Collectors.toList());
        builder.chartLines(chartLines);
        return builder.build();
    }

    public TransactionInsertDTO toDto(Transaction entity){
        List<Long> chartLineIds = Optional.ofNullable(entity.getChartLines())
                .map(lines -> lines.stream()
                        .map(ChartLine::getId)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
        return TransactionInsertDTO.builder()
                .description(entity.getDescription())
                .totalPrice(entity.getTotalPrice())
                .city(entity.getCity())
                .province(entity.getProvince())
                .country(entity.getCountry())
                .postalCode(entity.getPostalCode())
                .phone(entity.getPhone())
                .companyOwnerId(entity.getId())
                .chartLineIds(chartLineIds)
                .build();

    }
}


