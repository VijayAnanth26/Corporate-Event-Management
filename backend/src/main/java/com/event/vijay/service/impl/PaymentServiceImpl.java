package com.event.vijay.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.event.vijay.dto.request.PaymentRequest;
import com.event.vijay.dto.response.BookingResponse;
import com.event.vijay.dto.response.EventResponse;
import com.event.vijay.dto.response.PaymentResponse;
import com.event.vijay.dto.response.UserResponse;
import com.event.vijay.model.Booking;
import com.event.vijay.model.Event;
import com.event.vijay.model.Payment;
import com.event.vijay.model.User;
import com.event.vijay.repository.BookingRepository;
import com.event.vijay.repository.EventRepository;
import com.event.vijay.repository.PaymentRepository;
import com.event.vijay.service.PaymentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + request.getBookingId()));
        
        // Check if payment already exists for this booking
        if (paymentRepository.findByBooking(booking).isPresent()) {
            throw new IllegalStateException("Payment already exists for this booking");
        }
        
        // Generate a unique transaction ID
        String transactionId = UUID.randomUUID().toString();
        
        Payment payment = Payment.builder()
                .booking(booking)
                .amount(request.getAmount())
                .paymentDateTime(LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .status("SUCCESS")
                .transactionId(transactionId)
                .build();
        
        // Update booking status
        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);
        
        Payment savedPayment = paymentRepository.save(payment);
        return mapToPaymentResponse(savedPayment);
    }

    @Override
    public PaymentResponse getPaymentById(String paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + paymentId));
        return mapToPaymentResponse(payment);
    }

    @Override
    public PaymentResponse getPaymentByBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        
        Payment payment = paymentRepository.findByBooking(booking)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found for booking id: " + bookingId));
        
        return mapToPaymentResponse(payment);
    }

    @Override
    public List<PaymentResponse> getPaymentsByUser(String userId) {
        // Get all bookings for the user
        List<Booking> userBookings = bookingRepository.findAll().stream()
                .filter(booking -> booking.getUser().getId().equals(userId))
                .collect(Collectors.toList());
        
        // Get payments for these bookings
        return userBookings.stream()
                .map(booking -> paymentRepository.findByBooking(booking))
                .filter(paymentOpt -> paymentOpt.isPresent())
                .map(paymentOpt -> mapToPaymentResponse(paymentOpt.get()))
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse updatePaymentStatus(String paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + paymentId));
        
        payment.setStatus(status);
        Payment updatedPayment = paymentRepository.save(payment);
        return mapToPaymentResponse(updatedPayment);
    }
    
    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .booking(mapToBookingResponse(payment.getBooking()))
                .amount(payment.getAmount())
                .paymentDateTime(payment.getPaymentDateTime())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .build();
    }
    
    private BookingResponse mapToBookingResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .event(mapToEventResponse(booking.getEvent()))
                .user(mapToUserResponse(booking.getUser()))
                .numberOfTickets(booking.getNumberOfTickets())
                .totalAmount(booking.getTotalAmount())
                .bookingDateTime(booking.getBookingDateTime())
                .status(booking.getStatus())
                .build();
    }
    
    private EventResponse mapToEventResponse(Event event) {
        Integer bookedSeats = bookingRepository.countByEvent(event);
        Integer availableSeats = event.getCapacity() - (bookedSeats != null ? bookedSeats : 0);
        
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .location(event.getLocation())
                .capacity(event.getCapacity())
                .price(event.getPrice())
                .imageUrl(event.getImageUrl())
                .eventType(event.getEventType())
                .availableSeats(availableSeats)
                .build();
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
} 