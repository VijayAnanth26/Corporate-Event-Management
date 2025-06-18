package com.event.vijay.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private Integer capacity;
    private Double price;
    private String imageUrl;
    private String eventType;
} 