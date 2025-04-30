package com.ppp.Ecopilot.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventPredictionRequest {

    @JsonProperty("Duration (hours)")
    private double durationHours;

    @JsonProperty("Participants")
    private int participants;

    @JsonProperty("Number of Devices")
    private int numberOfDevices;

    @JsonProperty("Avg Power per Device (kW)")
    private double avgPowerPerDevice;

    @JsonProperty("Energy Usage Hours")
    private double energyUsageHours;

    @JsonProperty("Transport Distance (km)")
    private double transportDistanceKm;

    @JsonProperty("Attendees Using Transport")
    private int attendeesUsingTransport;

    @JsonProperty("Number of Meals")
    private int numberOfMeals;

    @JsonProperty("Printed Material (kg)")
    private double printedMaterialKg;

    @JsonProperty("Decoration Material (kg)")
    private double decorationMaterialKg;

    @JsonProperty("Event Type")
    private String eventType;

    @JsonProperty("Venue Type")
    private String venueType;

    @JsonProperty("Location")
    private String location;

    @JsonProperty("Transport Mode")
    private String transportMode;

    @JsonProperty("Meal Type")
    private String mealType;
}
