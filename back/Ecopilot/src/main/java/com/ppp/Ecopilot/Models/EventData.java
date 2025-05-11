package com.ppp.Ecopilot.Models;

public class EventData {
    private String eventName;
    private String eventType;
    private int duration;
    private int participants;
    private String venueType;
    private String location;
    private int numberOfDevices;
    private double avgPowerPerDevice;
    private int energyUsageHours;
    private String transportMode;
    private double transportDistance;
    private int attendeesUsingTransport;
    private String mealType;
    private int numberOfMeals;
    private double printedMaterial;
    private double decorationMaterial;
    private double totalEmissions;

    // Constructeur par défaut
    public EventData() {}

    // Constructeur avec tous les champs
    public EventData(String eventName, String eventType, int duration, int participants,
                     String venueType, String location, int numberOfDevices,
                     double avgPowerPerDevice, int energyUsageHours, String transportMode,
                     double transportDistance, int attendeesUsingTransport, String mealType,
                     int numberOfMeals, double printedMaterial, double decorationMaterial,
                     double totalEmissions) {
        this.eventName = eventName;
        this.eventType = eventType;
        this.duration = duration;
        this.participants = participants;
        this.venueType = venueType;
        this.location = location;
        this.numberOfDevices = numberOfDevices;
        this.avgPowerPerDevice = avgPowerPerDevice;
        this.energyUsageHours = energyUsageHours;
        this.transportMode = transportMode;
        this.transportDistance = transportDistance;
        this.attendeesUsingTransport = attendeesUsingTransport;
        this.mealType = mealType;
        this.numberOfMeals = numberOfMeals;
        this.printedMaterial = printedMaterial;
        this.decorationMaterial = decorationMaterial;
        this.totalEmissions = totalEmissions;
    }

    // Getters et setters
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public int getParticipants() { return participants; }
    public void setParticipants(int participants) { this.participants = participants; }

    public String getVenueType() { return venueType; }
    public void setVenueType(String venueType) { this.venueType = venueType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getNumberOfDevices() { return numberOfDevices; }
    public void setNumberOfDevices(int numberOfDevices) { this.numberOfDevices = numberOfDevices; }

    public double getAvgPowerPerDevice() { return avgPowerPerDevice; }
    public void setAvgPowerPerDevice(double avgPowerPerDevice) { this.avgPowerPerDevice = avgPowerPerDevice; }

    public int getEnergyUsageHours() { return energyUsageHours; }
    public void setEnergyUsageHours(int energyUsageHours) { this.energyUsageHours = energyUsageHours; }

    public String getTransportMode() { return transportMode; }
    public void setTransportMode(String transportMode) { this.transportMode = transportMode; }

    public double getTransportDistance() { return transportDistance; }
    public void setTransportDistance(double transportDistance) { this.transportDistance = transportDistance; }

    public int getAttendeesUsingTransport() { return attendeesUsingTransport; }
    public void setAttendeesUsingTransport(int attendeesUsingTransport) { this.attendeesUsingTransport = attendeesUsingTransport; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public int getNumberOfMeals() { return numberOfMeals; }
    public void setNumberOfMeals(int numberOfMeals) { this.numberOfMeals = numberOfMeals; }

    public double getPrintedMaterial() { return printedMaterial; }
    public void setPrintedMaterial(double printedMaterial) { this.printedMaterial = printedMaterial; }

    public double getDecorationMaterial() { return decorationMaterial; }
    public void setDecorationMaterial(double decorationMaterial) { this.decorationMaterial = decorationMaterial; }

    public double getTotalEmissions() { return totalEmissions; }
    public void setTotalEmissions(double totalEmissions) { this.totalEmissions = totalEmissions; }

    @Override
    public String toString() {
        return "EventData{" +
                "eventName='" + eventName + '\'' +
                ", eventType='" + eventType + '\'' +
                ", duration=" + duration +
                ", participants=" + participants +
                ", venueType='" + venueType + '\'' +
                ", location='" + location + '\'' +
                ", numberOfDevices=" + numberOfDevices +
                ", avgPowerPerDevice=" + avgPowerPerDevice +
                ", energyUsageHours=" + energyUsageHours +
                ", transportMode='" + transportMode + '\'' +
                ", transportDistance=" + transportDistance +
                ", attendeesUsingTransport=" + attendeesUsingTransport +
                ", mealType='" + mealType + '\'' +
                ", numberOfMeals=" + numberOfMeals +
                ", printedMaterial=" + printedMaterial +
                ", decorationMaterial=" + decorationMaterial +
                ", totalEmissions=" + totalEmissions +
                '}';
    }
}