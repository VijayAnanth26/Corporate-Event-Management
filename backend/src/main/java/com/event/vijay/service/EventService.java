package com.event.vijay.service;

import org.springframework.stereotype.Service;

import com.event.vijay.dto.request.EventRequest;
import com.event.vijay.dto.response.EventResponse;

import java.util.List;

@Service
public interface EventService {

    List<EventResponse> getAllEvents();

    EventResponse getEvent(Long eventId);

    EventResponse createEvent(EventRequest eventRequest);

    EventResponse updateEvent(Long eventId, EventRequest eventRequest);

    void deleteEvent(Long eventId);
}
