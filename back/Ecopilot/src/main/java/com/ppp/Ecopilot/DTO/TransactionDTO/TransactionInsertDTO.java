package com.ppp.Ecopilot.DTO.TransactionDTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TransactionInsertDTO {
    private String description;
    private Long totalPrice;
    private Long companyOwnerId;
    private List<Long> chartLineIds;

}
