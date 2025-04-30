export class Event {
  eventName: string;
  eventType: string;
  duration: number;
  participantsNbr: number;
  venueType: string;
  location: string;
  deviceNbr: number;
  avgPowerPerDevice: number;
  energyUsageHours: number;
  transportMode: string;
  transportDistance: number;
  attendeesUsingTransport: number;
  mealType: string;
  nbrOfMeals: number;
  printedMaterial: number;
  decorationMaterial: number;
  companyOwnerId: number; // Required field

  constructor(
    eventName: string = '',
    eventType: string = '',
    duration: number = 0,
    participantsNbr: number = 0,
    venueType: string = '',
    location: string = '',
    deviceNbr: number = 0,
    avgPowerPerDevice: number = 0,
    energyUsageHours: number = 0,
    transportMode: string = '',
    transportDistance: number = 0,
    attendeesUsingTransport: number = 0,
    mealType: string = '',
    nbrOfMeals: number = 0,
    printedMaterial: number = 0,
    decorationMaterial: number = 0,
    companyOwnerId: number = 0
  ) {
    this.eventName = eventName;
    this.eventType = eventType;
    this.duration = duration;
    this.participantsNbr = participantsNbr;
    this.venueType = venueType;
    this.location = location;
    this.deviceNbr = deviceNbr;
    this.avgPowerPerDevice = avgPowerPerDevice;
    this.energyUsageHours = energyUsageHours;
    this.transportMode = transportMode;
    this.transportDistance = transportDistance;
    this.attendeesUsingTransport = attendeesUsingTransport;
    this.mealType = mealType;
    this.nbrOfMeals = nbrOfMeals;
    this.printedMaterial = printedMaterial;
    this.decorationMaterial = decorationMaterial;
    this.companyOwnerId = companyOwnerId;
  }
}
