export class Event {
  eventName: string;
  eventType: string;
  duration: number;
  participants: number;
  venueType: string;
  location: string;
  numberOfDevices: number;
  avgPowerPerDevice: number;
  energyUsageHours: number;
  transportMode: string;
  transportDistance: number;
  attendeesUsingTransport: number;
  mealType: string;
  numberOfMeals: number;
  printedMaterial: number;
  decorationMaterial: number;

  constructor(
    eventName: string = '',
    eventType: string = '',
    duration: number = 0,
    participants: number = 0,
    venueType: string = '',
    location: string = '',
    numberOfDevices: number = 0,
    avgPowerPerDevice: number = 0,
    energyUsageHours: number = 0,
    transportMode: string = '',
    transportDistance: number = 0,
    attendeesUsingTransport: number = 0,
    mealType: string = '',
    numberOfMeals: number = 0,
    printedMaterial: number = 0,
    decorationMaterial: number = 0
  ) {
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
  }
}
