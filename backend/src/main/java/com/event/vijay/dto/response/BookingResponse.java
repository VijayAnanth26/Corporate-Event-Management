package com.event.vijay.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private String id;
    private EventResponse event;
    private UserResponse user;
    private Integer numberOfTickets;
    private Double totalAmount;
    private LocalDateTime bookingDateTime;
    private String status;
} 