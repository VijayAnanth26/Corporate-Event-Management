package com.event.vijay.service;

import java.util.List;

import com.event.vijay.dto.request.EventRequest;
import com.event.vijay.dto.response.EventResponse;

public interface EventService {
    EventResponse createEvent(EventRequest request);
    EventResponse updateEvent(String eventId, EventRequest request);
    EventResponse getEventById(String eventId);
    List<EventResponse> getAllEvents();
    List<EventResponse> getUpcomingEvents();
    List<EventResponse> getEventsByType(String eventType);
    List<EventResponse> searchEvents(String query);
    void deleteEvent(String eventId);
} 