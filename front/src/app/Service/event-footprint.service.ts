import { Injectable } from '@angular/core';
import { Event } from '../Models/eventForm';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CarbonControllerService } from '../api/services';
import { CarbonResponse } from '../api/models';

@Injectable({
  providedIn: 'root',
})
export class EventFootprintService {
  // Store the event data in the service
  private eventData: Event | null = null;
  recommendations: CarbonResponse | null = null;

  // Storage keys for localStorage
  private readonly STORAGE_KEY = 'event_recommendations';
  private readonly FORM_DATA_KEY = 'event_form_data';

  // BehaviorSubject to track recommendations changes
  private recommendationsSubject = new BehaviorSubject<CarbonResponse | null>(
    null
  );
  // Observable that components can subscribe to
  public recommendations$ = this.recommendationsSubject.asObservable();

  constructor(private carbonAIController: CarbonControllerService) {
    // Load saved recommendations from localStorage on service initialization
    this.loadSavedRecommendations();
    this.loadSavedFormData();
  }

  // Method to update the event data
  updateEventData(event: Event): void {
    this.eventData = event;
    this.saveFormData();
  }

  // Method to get the stored event data
  getEventData(): Event | null {
    return this.eventData;
  }

  // Save form data to localStorage
  private saveFormData(): void {
    try {
      localStorage.setItem(this.FORM_DATA_KEY, JSON.stringify(this.eventData));
    } catch (error) {
      console.error('Error saving event form data to localStorage:', error);
    }
  }

  // Load saved form data from localStorage
  private loadSavedFormData(): void {
    try {
      const savedData = localStorage.getItem(this.FORM_DATA_KEY);
      if (savedData) {
        this.eventData = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading event form data from localStorage:', error);
    }
  }

  // Save recommendations to localStorage
  private saveRecommendations(recommendations: CarbonResponse): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recommendations));
    } catch (error) {
      console.error(
        'Error saving event recommendations to localStorage:',
        error
      );
    }
  }

  // Load saved recommendations from localStorage
  private loadSavedRecommendations(): void {
    try {
      const savedRecommendations = localStorage.getItem(this.STORAGE_KEY);
      if (savedRecommendations) {
        const parsedRecommendations = JSON.parse(
          savedRecommendations
        ) as CarbonResponse;
        this.recommendations = parsedRecommendations;
        this.recommendationsSubject.next(parsedRecommendations);
      }
    } catch (error) {
      console.error(
        'Error loading event recommendations from localStorage:',
        error
      );
    }
  }

  // Clear stored recommendations
  public clearRecommendations(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.recommendations = null;
    this.recommendationsSubject.next(null);
  }

  getEventRecommendations() {
    if (!this.eventData) {
      console.error('Event data is missing');
      return;
    }

    console.log('eventData:', this.eventData);
    this.carbonAIController
      .generateRecommendationsEvent({
        body: this.eventData,
      })
      .subscribe((response) => {
        this.recommendations = response;
        // Save to localStorage for persistence
        this.saveRecommendations(response);
        // Emit the new value to all subscribers
        this.recommendationsSubject.next(response);
        alert('Event recommendations generated successfully');
      });
  }

  submitEventData() {
    this.getEventRecommendations();
  }

  getTotalFootprint() {
    return this.calculateEventFootprint(this.eventData!);
  }

  // Simulated calculation of event's carbon footprint (for now, this is just a placeholder)
  calculateEventFootprint(eventData: Event): number {
    // Placeholder for the actual logic to calculate carbon footprint
    // You can replace this with a more detailed calculation based on event data
    const estimatedFootprint = 100; // Example carbon footprint
    return estimatedFootprint;
  }
}
