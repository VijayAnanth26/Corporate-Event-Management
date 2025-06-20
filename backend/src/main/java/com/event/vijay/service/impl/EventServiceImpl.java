package com.event.vijay.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.event.vijay.dto.request.EventRequest;
import com.event.vijay.dto.response.EventResponse;
import com.event.vijay.model.Event;
import com.event.vijay.repository.EventRepository;
import com.event.vijay.service.EventService;

import java.util.List;
import java.util.stream.Collectors;

// import lombok.RequiredArgsConstructor;

@Service
// @RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<EventResponse> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    private EventResponse mapToEventResponse(Event event) {
        EventResponse eventResponse = new EventResponse();
        eventResponse.setEventId(event.getEventId());
        eventResponse.setEventType(event.getEventType());
        eventResponse.setEventName(event.getEventName());
        eventResponse.setDescription(event.getDescription());
        eventResponse.setEventDescription(event.getEventDescription());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setEventTime(event.getEventTime());
        eventResponse.setEventVenue(event.getEventVenue());
        eventResponse.setEventImageUrl(event.getEventImageUrl());
        eventResponse.setParticipantsCount(event.getParticipantsCount());
        eventResponse.setEventCharges(event.getEventCharges());
        eventResponse.setEventPrice(event.getEventPrice());
        return eventResponse;
    }

    @Override
    public EventResponse getEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found with id: " + eventId));

        return mapToEventResponse(event);
    }

    @Override
    public EventResponse createEvent(EventRequest eventRequest) {
        Event event = new Event();
        event.setEventType(eventRequest.getEventType());
        event.setEventName(eventRequest.getEventName());
        event.setDescription(eventRequest.getDescription());
        event.setEventDescription(eventRequest.getEventDescription());
        event.setEventDate(eventRequest.getEventDate());
        event.setEventTime(eventRequest.getEventTime());
        event.setEventVenue(eventRequest.getEventVenue());
        event.setEventImageUrl(eventRequest.getEventImageUrl());
        event.setParticipantsCount(eventRequest.getParticipantsCount());
        event.setEventCharges(eventRequest.getEventCharges());
        event.setEventPrice(eventRequest.getEventPrice());

        Event createdEvent = eventRepository.save(event);

        return mapToEventResponse(createdEvent);
    }

    @Override
    public EventResponse updateEvent(Long eventId, EventRequest eventRequest) {
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found with id: " + eventId));

        existingEvent.setEventType(eventRequest.getEventType());
        existingEvent.setEventName(eventRequest.getEventName());
        existingEvent.setDescription(eventRequest.getDescription());
        existingEvent.setEventDescription(eventRequest.getEventDescription());
        existingEvent.setEventDate(eventRequest.getEventDate());
        existingEvent.setEventTime(eventRequest.getEventTime());
        existingEvent.setEventVenue(eventRequest.getEventVenue());
        existingEvent.setEventImageUrl(eventRequest.getEventImageUrl());
        existingEvent.setParticipantsCount(eventRequest.getParticipantsCount());
        existingEvent.setEventCharges(eventRequest.getEventCharges());
        existingEvent.setEventPrice(eventRequest.getEventPrice());

        Event updatedEvent = eventRepository.save(existingEvent);

        return mapToEventResponse(updatedEvent);
    }

    @Override
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}