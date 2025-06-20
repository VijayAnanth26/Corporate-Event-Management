package com.event.vijay.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventResponse {
    private Long eventId;
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
