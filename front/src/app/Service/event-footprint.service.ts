import { Injectable } from '@angular/core';
import { Event } from '../Models/eventForm'; // Import the Event

@Injectable({
  providedIn: 'root'
})
export class EventFootprintService {
  // Store the event data in the service
  private eventData: Event | null = null;

  constructor() {}

  // Method to update the event data
  updateEventData(event: Event): void {
    this.eventData = event;
  }

  // Method to get the stored event data
  getEventData(): Event | null {
    return this.eventData;
  }
  getTotalFootprint(){
    return this.calculateEventFootprint(this.eventData!);
  }

  // Simulated calculation of event's carbon footprint (for now, this is just a placeholder)
  calculateEventFootprint(eventData: Event): number {
    // Placeholder for the actual logic to calculate carbon footprint
    // You can replace this with a more detailed calculation based on event data
    const estimatedFootprint = 100; // Example carbon footprint
    alert('done');
    return estimatedFootprint;
  }
}
