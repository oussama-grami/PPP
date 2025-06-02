package com.ppp.Ecopilot.DTO.EventFootprintDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CreateEventFootprintDataDto {
    @NotNull
    private int attendeesUsingTransport;
    @NotNull
    private int avgPowerPerDevice;
    @NotNull
    private int decorationMaterial;
    @NotNull
    private int deviceNbr;
    @NotNull
    private int duration;
    @NotNull
    private int energyUsageHours;
    @NotNull
    private String eventName;
    @NotNull
    private String eventType;
    @NotNull
    private String location;
    @NotNull
    private String mealType;
    @NotNull
    private int nbrOfMeals;
    @NotNull
    private int participantsNbr;
    @NotNull
    private int printedMaterial;
    @NotNull
    private float transportDistance;
    @NotNull
    private String transportMode;
    @NotNull
    private String venueType;

}
