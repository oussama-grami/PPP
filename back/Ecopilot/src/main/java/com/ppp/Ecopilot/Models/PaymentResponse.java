package com.ppp.Ecopilot.Models;

import lombok.Data;

@Data
public class PaymentResponse {
    private String clientSecret;
    private String publicKey;
}
