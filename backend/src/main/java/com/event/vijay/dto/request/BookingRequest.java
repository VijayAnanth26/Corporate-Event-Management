package com.event.vijay.dto.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private String userId;
    private Long eventId;
    private String bookingDate;
    private Integer numberOfTickets;
    private Double totalAmount;
    private String description;
    private Date eventDate;
    private Integer headcount;
    private Double amount;
}
