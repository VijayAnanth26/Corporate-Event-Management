package com.event.vijay.service;

import java.util.List;

import com.event.vijay.dto.request.BookingRequest;
import com.event.vijay.dto.response.BookingResponse;

public interface BookingService {
    BookingResponse createBooking(String userId, BookingRequest request);
    BookingResponse getBookingById(String bookingId);
    List<BookingResponse> getBookingsByUser(String userId);
    List<BookingResponse> getBookingsByEvent(String eventId);
    BookingResponse updateBookingStatus(String bookingId, String status);
    void cancelBooking(String bookingId);
} 