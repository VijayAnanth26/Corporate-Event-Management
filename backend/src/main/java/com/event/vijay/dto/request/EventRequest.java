package com.event.vijay.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {
    private String eventType;
    private String eventName;
    private String description;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private String eventVenue;
    private String eventImageUrl;
    private Integer participantsCount;
    private Integer eventCharges;
    private Integer eventPrice;
}
