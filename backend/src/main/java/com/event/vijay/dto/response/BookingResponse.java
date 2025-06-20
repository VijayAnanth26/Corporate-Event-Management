package com.event.vijay.dto.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long bookingId;
    private String userId;
    private Date submissionDate;
    private String description;
    private Date eventDate;
    private boolean bookingStatus;
    private Integer headcount;
    private Double amount;
}
