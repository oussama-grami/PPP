package com.ppp.Ecopilot.Mappers.Transaction;

import com.ppp.Ecopilot.DTO.Project.ProjectDTO;
import com.ppp.Ecopilot.DTO.TransactionDTO.TransactionDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import com.ppp.Ecopilot.Entities.Transaction;
import com.ppp.Ecopilot.Mappers.EntityMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionMapper implements EntityMapper<Transaction, TransactionDTO> {
    @Override
    public Transaction toEntity(TransactionDTO dto){
        Transaction.TransactionBuilder builder = Transaction.builder()
                .id(dto.getId())
                .description(dto.getDescription())
                .totalPrice(dto.getTotalPrice())
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
    @Override
    public TransactionDTO toDto(Transaction entity){
        List<Long> chartLineIds = Optional.ofNullable(entity.getChartLines())
                .map(lines -> lines.stream()
                        .map(ChartLine::getId)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        return TransactionDTO.builder()
                .id(entity.getId())
                .description(entity.getDescription())
                .totalPrice(entity.getTotalPrice())
                .companyOwnerId(entity.getCompanyOwner().getId())
                .chartLineIds(chartLineIds)
                .province(entity.getProvince())
                .city(entity.getCity())
                .country(entity.getCountry())
                .address(entity.getAddress())
                .createdAt(entity.getCreatedDate())
                .build();
    }
}
