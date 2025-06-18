package com.event.vijay.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.event.vijay.dto.request.EventRequest;
import com.event.vijay.dto.response.EventResponse;
import com.event.vijay.model.Event;
import com.event.vijay.repository.BookingRepository;
import com.event.vijay.repository.EventRepository;
import com.event.vijay.service.EventService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    @Override
    public EventResponse createEvent(EventRequest request) {
        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate())
                .time(request.getTime())
                .location(request.getLocation())
                .capacity(request.getCapacity())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .eventType(request.getEventType())
                .build();
        
        Event savedEvent = eventRepository.save(event);
        return mapToEventResponse(savedEvent);
    }

    @Override
    public EventResponse updateEvent(String eventId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setLocation(request.getLocation());
        event.setCapacity(request.getCapacity());
        event.setPrice(request.getPrice());
        event.setImageUrl(request.getImageUrl());
        event.setEventType(request.getEventType());
        
        Event updatedEvent = eventRepository.save(event);
        return mapToEventResponse(updatedEvent);
    }

    @Override
    public EventResponse getEventById(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        return mapToEventResponse(event);
    }

    @Override
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventResponse> getUpcomingEvents() {
        return eventRepository.findByDateGreaterThanEqual(LocalDate.now()).stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventResponse> getEventsByType(String eventType) {
        return eventRepository.findByEventType(eventType).stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventResponse> searchEvents(String query) {
        return eventRepository.findByTitleContainingIgnoreCase(query).stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEvent(String eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new EntityNotFoundException("Event not found with id: " + eventId);
        }
        eventRepository.deleteById(eventId);
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
} 