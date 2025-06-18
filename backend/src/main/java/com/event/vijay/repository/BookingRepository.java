package com.event.vijay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.vijay.model.Booking;
import com.event.vijay.model.Event;
import com.event.vijay.model.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByUser(User user);
    List<Booking> findByEvent(Event event);
    List<Booking> findByStatus(String status);
    Integer countByEvent(Event event);
} 