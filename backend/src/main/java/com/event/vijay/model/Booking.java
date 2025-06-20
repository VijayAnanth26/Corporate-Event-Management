package com.event.vijay.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "booking")
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    
    @Column(nullable = false)
    private String userId;
    
    // @Column(nullable = false)
    private Date submissionDate;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Date eventDate;
    // @Column(nullable = false)
    private boolean bookingStatus;
    @Column(nullable = false)
    private Integer headcount;
    // @Column(nullable = false)
    private Double amount;

    // Uncomment the lines below if you want to include relationships
    // @ManyToOne
    // @JoinColumn(name = "event_id")
    // private Event event;

    // @OneToOne(mappedBy = "booking")
    // private Payment payment;
}