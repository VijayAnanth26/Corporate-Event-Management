package com.event.vijay.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
    
    @Column(nullable = false)
    private String userId;
    
    @Column(nullable = false)
    private Double amount;
    // @Column(nullable = false)
    private Date paymentDate;
    @Column(nullable = false)
    private String modeOfPayment;

    // @OneToOne(mappedBy = "payment")
    // private Booking booking;

}
