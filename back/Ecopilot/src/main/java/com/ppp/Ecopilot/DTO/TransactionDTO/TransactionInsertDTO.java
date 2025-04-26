package com.ppp.Ecopilot.DTO.TransactionDTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ppp.Ecopilot.Entities.ChartLine;
import com.ppp.Ecopilot.Entities.CompanyOwner;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TransactionInsertDTO {
    private String description;
    private Float totalPrice;
    private String address;
    private String country;
    @Length(min = 8, max = 8)
    private String phone;
    private int postalCode = 1000;
    private String city;
    private String province;
    private Long companyOwnerId;
    private List<Long> chartLineIds;

}
