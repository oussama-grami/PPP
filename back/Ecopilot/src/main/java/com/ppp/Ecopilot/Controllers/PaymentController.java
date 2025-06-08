package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.Models.PaymentRequest;
import com.ppp.Ecopilot.Models.PaymentResponse;
import com.ppp.Ecopilot.Services.Implementations.ProjectServiceImpl;
import com.ppp.Ecopilot.Services.Implementations.TransactionServiceImpl;
import com.ppp.Ecopilot.Services.TransactionService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final TransactionServiceImpl transactionService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentResponse> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
            return new ResponseEntity<>(this.transactionService.createPaymentIntent(paymentRequest), HttpStatus.OK);
    }

    @PostMapping("/payment-success")
    public ResponseEntity<Map<String, String>> paymentSuccess(@RequestParam("payment_intent") String paymentIntentId) {
        Map<String, String> response = new HashMap<>();
        response = this.transactionService.paymentSuccess(paymentIntentId);
        ;
        if (response.get("status").equals("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

}
