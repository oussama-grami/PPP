import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../Models/eventForm';
import { EventResponse } from '../Models/eventResponse';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventFootprintService {
  private eventData: Event | null = null;
  private eventResponses: EventResponse[] = [];  // cached list
  private readonly apiUrl = 'http://localhost:8080/api/event';

  constructor(private http: HttpClient) {}

  updateEventData(event: Event): void {
    this.eventData = event;
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

  getEventsByCompanyOwnerId(ownerId: number): Observable<EventResponse[]> {
    return this.http.get<EventResponse[]>(`${this.apiUrl}?companyOwnerId=${ownerId}`).pipe(
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
  }
}
