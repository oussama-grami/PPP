package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class EventFootprintData extends BaseEntity<Long> {
    @Column(nullable = false)
    private int AttendeesUsingTransport;
    @Column(nullable = false)
    private int avgPowerPerDevice;
    @Column(nullable = false)
    private int decorationMaterial;
    @Column(nullable = false)
    private int DeviceNbr;
    @Column(nullable = false)
    private int duration;
    @Column(nullable = false)
    private int energyUsageHours;
    @Column(nullable = false)
    private String eventName;
    @Column(nullable = false)
    private String eventType;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private String mealType;
    @Column(nullable = false)
    private int nbrOfMeals;
    @Column(nullable = false)
    private int participantsNbr;
    @Column(nullable = false)
    private int printedMaterial;
    @Column(nullable = false)
    private double totalEmission;
    @Column(nullable = false)
    private float transportDistance;
    @Column(nullable = false)
    private String transportMode;
    @Column(nullable = false)
    private String venueType;
    @ManyToOne
    @JoinColumn(name = "companyOwner_id")
    private CompanyOwner companyOwner;

}