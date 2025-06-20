package com.event.vijay.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.event.vijay.dto.request.PaymentRequest;
import com.event.vijay.dto.response.PaymentResponse;
import com.event.vijay.model.Payment;
import com.event.vijay.repository.PaymentRepository;
import com.event.vijay.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public PaymentResponse getPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found with id: " + paymentId));

        return mapToPaymentResponse(payment);
    }

    public PaymentResponse createPayment(PaymentRequest paymentRequest) {
        Payment payment = new Payment();
        payment.setUserId(paymentRequest.getUserId());
        payment.setAmount(paymentRequest.getAmount());
        payment.setModeOfPayment(paymentRequest.getModeOfPayment());

        Payment createdPayment = paymentRepository.save(payment);

        return mapToPaymentResponse(createdPayment);
    }

    public PaymentResponse updatePayment(Long paymentId, PaymentRequest paymentRequest) {
        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found with id: " + paymentId));

        existingPayment.setAmount(paymentRequest.getAmount());
        existingPayment.setModeOfPayment(paymentRequest.getModeOfPayment());

        Payment updatedPayment = paymentRepository.save(existingPayment);

        return mapToPaymentResponse(updatedPayment);
    }

    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }
    
    @Override
    public List<PaymentResponse> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(this::mapToPaymentResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<PaymentResponse> getPaymentsByUserId(String userId) {
        List<Payment> payments = paymentRepository.findByUserId(userId);
        return payments.stream()
                .map(this::mapToPaymentResponse)
                .collect(Collectors.toList());
    }
    
    private PaymentResponse mapToPaymentResponse(Payment payment) {
        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentId(payment.getPaymentId());
        paymentResponse.setUserId(payment.getUserId());
        paymentResponse.setAmount(payment.getAmount());
        paymentResponse.setPaymentDate(payment.getPaymentDate());
        paymentResponse.setModeOfPayment(payment.getModeOfPayment());
        return paymentResponse;
    }
}
