package com.event.vijay.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.vijay.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    List<Event> findByDateGreaterThanEqual(LocalDate date);
    List<Event> findByEventType(String eventType);
    List<Event> findByTitleContainingIgnoreCase(String title);
} 