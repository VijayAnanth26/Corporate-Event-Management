package com.event.vijay.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.event.vijay.dto.request.BookingRequest;
import com.event.vijay.dto.response.BookingResponse;
import com.event.vijay.model.Booking;
import com.event.vijay.repository.BookingRepository;
import com.event.vijay.service.BookingService;

// @SuppressWarnings("null")
@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public BookingResponse getBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with id: " + bookingId));

        return mapToBookingResponse(booking);
    }

    @Override
    public BookingResponse createBooking(BookingRequest bookingRequest) {
        Booking booking = new Booking();
        booking.setUserId(bookingRequest.getUserId());
        
        // Set description from request or use a default
        if (bookingRequest.getDescription() != null) {
            booking.setDescription(bookingRequest.getDescription());
        } else {
            booking.setDescription("Event booking");
        }
        
        // Set event date from request or use current date
        if (bookingRequest.getEventDate() != null) {
            booking.setEventDate(bookingRequest.getEventDate());
        } else if (bookingRequest.getBookingDate() != null) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date parsedDate = dateFormat.parse(bookingRequest.getBookingDate());
                booking.setEventDate(parsedDate);
            } catch (ParseException e) {
                booking.setEventDate(new Date());
            }
        } else {
            booking.setEventDate(new Date());
        }
        
        // Set submission date to current date
        booking.setSubmissionDate(new Date());
        
        // Set headcount from numberOfTickets or headcount
        if (bookingRequest.getNumberOfTickets() != null) {
            booking.setHeadcount(bookingRequest.getNumberOfTickets());
        } else if (bookingRequest.getHeadcount() != null) {
            booking.setHeadcount(bookingRequest.getHeadcount());
        } else {
            booking.setHeadcount(1); // Default to 1 ticket
        }
        
        // Set amount from totalAmount or amount
        if (bookingRequest.getTotalAmount() != null) {
            booking.setAmount(bookingRequest.getTotalAmount());
        } else if (bookingRequest.getAmount() != null) {
            booking.setAmount(bookingRequest.getAmount());
        } else {
            booking.setAmount(0.0); // Default to 0
        }
        
        // Set booking status to true (confirmed)
        booking.setBookingStatus(true);

        Booking createdBooking = bookingRepository.save(booking);

        return mapToBookingResponse(createdBooking);
    }

    @Override
    public BookingResponse updateBooking(Long bookingId, BookingRequest bookingRequest) {
        Booking existingBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with id: " + bookingId));

        if (bookingRequest.getDescription() != null) {
            existingBooking.setDescription(bookingRequest.getDescription());
        }
        
        if (bookingRequest.getEventDate() != null) {
            existingBooking.setEventDate(bookingRequest.getEventDate());
        }
        
        if (bookingRequest.getNumberOfTickets() != null) {
            existingBooking.setHeadcount(bookingRequest.getNumberOfTickets());
        } else if (bookingRequest.getHeadcount() != null) {
            existingBooking.setHeadcount(bookingRequest.getHeadcount());
        }
        
        if (bookingRequest.getTotalAmount() != null) {
            existingBooking.setAmount(bookingRequest.getTotalAmount());
        } else if (bookingRequest.getAmount() != null) {
            existingBooking.setAmount(bookingRequest.getAmount());
        }

        Booking updatedBooking = bookingRepository.save(existingBooking);

        return mapToBookingResponse(updatedBooking);
    }

    @Override
    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
    
    @Override
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookingResponse> getBookingsByUserId(String userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }
    
    private BookingResponse mapToBookingResponse(Booking booking) {
        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setBookingId(booking.getBookingId());
        bookingResponse.setUserId(booking.getUserId());
        bookingResponse.setSubmissionDate(booking.getSubmissionDate());
        bookingResponse.setDescription(booking.getDescription());
        bookingResponse.setEventDate(booking.getEventDate());
        bookingResponse.setBookingStatus(booking.isBookingStatus());
        bookingResponse.setHeadcount(booking.getHeadcount());
        bookingResponse.setAmount(booking.getAmount());
        return bookingResponse;
    }
}
