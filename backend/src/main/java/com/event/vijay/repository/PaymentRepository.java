package com.event.vijay.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.vijay.model.Booking;
import com.event.vijay.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    List<Payment> findByStatus(String status);
    Optional<Payment> findByBooking(Booking booking);
    Optional<Payment> findByTransactionId(String transactionId);
} 