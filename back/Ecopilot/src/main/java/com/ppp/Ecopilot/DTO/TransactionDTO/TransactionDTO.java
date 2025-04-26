package com.ppp.Ecopilot.DTO.TransactionDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ppp.Ecopilot.DTO.BaseDTO;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TransactionDTO extends BaseDTO {
    private String description;
    private List<Long> chartLineIds;
    private Long companyOwnerId;
    private Float totalPrice;
    private String phone;
    private String address;
    private String country;
    private int postalCode = 1000;
    private String city;
    private String province;
    private LocalDateTime createdAt;

}
