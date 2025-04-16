package com.ppp.Ecopilot.Models;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long amount;
    private String currency;
    private String description;
    private Long companyOwnerId;
    private Long[] cartLineIds;
    private String totalPrice;
    private CustomerInfo customerInfo;
}
