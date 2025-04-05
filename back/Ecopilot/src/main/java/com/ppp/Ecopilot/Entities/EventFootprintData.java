package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
public class EventFootprintData extends BaseEntity<Long> {
    private int AttendeesUsingTransport;
    private int avgPowerPerDevice;
    private int decorationMaterial;
    private int DeviceNbr;
    private int duration;
    private int energyUsageHours;
    private String eventName;
    private String eventType;
    private String location;
    private String melType;
    private int nbrOfMeals;
    private int participantsNbr;
    private int printedMaterial;
    private double totalEmission;
    private float transportDistance;
    private String transportMode;
    private String venueType;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;

}