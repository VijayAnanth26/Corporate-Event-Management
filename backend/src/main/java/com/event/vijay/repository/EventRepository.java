package com.event.vijay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.vijay.model.Event;
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

}
