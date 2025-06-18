package com.event.vijay.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.vijay.dto.request.BookingRequest;
import com.event.vijay.dto.response.BookingResponse;
import com.event.vijay.model.User;
import com.event.vijay.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody BookingRequest request) {
        return new ResponseEntity<>(bookingService.createBooking(user.getId(), request), HttpStatus.CREATED);
    }
    
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<BookingResponse>> getMyBookings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(user.getId()));
    }
    
    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getBookingsByEvent(@PathVariable String eventId) {
        return ResponseEntity.ok(bookingService.getBookingsByEvent(eventId));
    }
    
    @PutMapping("/{bookingId}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable String bookingId,
            @RequestBody String status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(bookingId, status));
    }
    
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable String bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.noContent().build();
    }
} 