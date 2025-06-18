package com.event.vijay.service;

import java.util.List;

import com.event.vijay.dto.request.PaymentRequest;
import com.event.vijay.dto.response.PaymentResponse;

public interface PaymentService {
    PaymentResponse processPayment(PaymentRequest request);
    PaymentResponse getPaymentById(String paymentId);
    PaymentResponse getPaymentByBooking(String bookingId);
    List<PaymentResponse> getPaymentsByUser(String userId);
    PaymentResponse updatePaymentStatus(String paymentId, String status);
} 