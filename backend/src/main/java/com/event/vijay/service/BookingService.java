package com.event.vijay.service;

import java.util.List;
import com.event.vijay.dto.request.BookingRequest;
import com.event.vijay.dto.response.BookingResponse;

public interface BookingService {

    BookingResponse getBooking(Long bookingId);

    BookingResponse createBooking(BookingRequest bookingRequest);

    BookingResponse updateBooking(Long bookingId, BookingRequest bookingRequest);

    void deleteBooking(Long bookingId);
    
    List<BookingResponse> getAllBookings();
    
    List<BookingResponse> getBookingsByUserId(String userId);
}
