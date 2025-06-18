package com.event.vijay.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private String id;
    private BookingResponse booking;
    private Double amount;
    private LocalDateTime paymentDateTime;
    private String paymentMethod;
    private String status;
    private String transactionId;
} 