package com.event.vijay.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.event.vijay.dto.request.BookingRequest;
import com.event.vijay.dto.response.BookingResponse;
import com.event.vijay.dto.response.EventResponse;
import com.event.vijay.dto.response.UserResponse;
import com.event.vijay.model.Booking;
import com.event.vijay.model.Event;
import com.event.vijay.model.User;
import com.event.vijay.repository.BookingRepository;
import com.event.vijay.repository.EventRepository;
import com.event.vijay.repository.UserRepository;
import com.event.vijay.service.BookingService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Override
    public BookingResponse createBooking(String userId, BookingRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + request.getEventId()));
        
        // Check if there are enough seats available
        Integer bookedSeats = bookingRepository.countByEvent(event);
        if (bookedSeats == null) {
            bookedSeats = 0;
        }
        
        if (event.getCapacity() - bookedSeats < request.getNumberOfTickets()) {
            throw new IllegalStateException("Not enough seats available for this event");
        }
        
        // Calculate total amount
        Double totalAmount = event.getPrice() * request.getNumberOfTickets();
        
        Booking booking = Booking.builder()
                .user(user)
                .event(event)
                .numberOfTickets(request.getNumberOfTickets())
                .totalAmount(totalAmount)
                .bookingDateTime(LocalDateTime.now())
                .status("PENDING")
                .build();
        
        Booking savedBooking = bookingRepository.save(booking);
        return mapToBookingResponse(savedBooking);
    }

    @Override
    public BookingResponse getBookingById(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        return mapToBookingResponse(booking);
    }

    @Override
    public List<BookingResponse> getBookingsByUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        
        return bookingRepository.findByUser(user).stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getBookingsByEvent(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        
        return bookingRepository.findByEvent(event).stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse updateBookingStatus(String bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);
        return mapToBookingResponse(updatedBooking);
    }

    @Override
    public void cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
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