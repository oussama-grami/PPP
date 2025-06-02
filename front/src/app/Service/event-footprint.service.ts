import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Event} from '../Models/eventForm';
import {EventResponse} from '../Models/eventResponse';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CarbonControllerService} from '../api/services';
import {CarbonResponse} from '../api/models';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EventFootprintService {
  private eventData: Event | null = null;
  private eventResponses: EventResponse[] = [];  // cached list
  private readonly apiUrl = environment.apiUrl + '/api/event';


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

  constructor(private carbonAIController: CarbonControllerService, private http: HttpClient) {
    // Load saved recommendations from localStorage on service initialization
    this.loadSavedRecommendations();
    this.loadSavedFormData();
  }

  updateEventData(event: Event): void {
    this.eventData = event;
    this.saveFormData();
  }

  getEventData(): Event | null {
    return this.eventData;
  }

  createEvent(eventData: Event): Observable<any> {
    console.log(eventData);
    return this.http.post(`${this.apiUrl}`, eventData);
  }

  getEventById(id: number): Observable<EventResponse> {
    return this.http.get<EventResponse>(`${this.apiUrl}/${id}`);
  }

  getEventsByCompanyOwnerId(): Observable<EventResponse[]> {
    return this.http.get<EventResponse[]>(`${this.apiUrl}`).pipe(
      map(events => {
        this.eventResponses = events;  // cache list
        return events;
      })
    );
  }


  getTotalFootprint(eventId: number): Observable<number> {
    if (this.eventResponses.length > 0) {
      const found = this.eventResponses.find(e => e.id === eventId);
      if (found) {
        return of(found.totalEmission);
      }
    }
    return this.getEventById(eventId).pipe(map(e => e.totalEmission));
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  // Optionally expose the list for components
  getCachedEventResponses(): EventResponse[] {
    return this.eventResponses;
    // Save form data to localStorage
  }

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

  /*  getTotalFootprint() {
      return this.calculateEventFootprint(this.eventData!);
    }*/

  // Simulated calculation of event's carbon footprint (for now, this is just a placeholder)
  /*  calculateEventFootprint(eventData: Event): number {
      // Placeholder for the actual logic to calculate carbon footprint
      // You can replace this with a more detailed calculation based on event data
      const estimatedFootprint = 100; // Example carbon footprint
      return estimatedFootprint;
    }*/
}
