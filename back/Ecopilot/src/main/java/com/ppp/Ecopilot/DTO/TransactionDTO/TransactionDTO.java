package com.ppp.Ecopilot.DTO.TransactionDTO;
import com.ppp.Ecopilot.DTO.BaseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TransactionDTO extends BaseDTO {
    private String description;
    private List<Long> chartLineIds;
    private Long companyOwnerId;
    private Long totalPrice;
}
