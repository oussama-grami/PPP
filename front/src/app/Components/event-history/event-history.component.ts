import { Component, OnInit } from '@angular/core';
import { EventFootprintService } from '../../Service/event-footprint.service';
import { EventResponse } from '../../Models/eventResponse';
import { Router } from '@angular/router';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent implements OnInit {
  events: EventResponse[] = [];
  isLoading = true;

  constructor(
    private eventService: EventFootprintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEventsByCompanyOwnerId().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading event history:', err);
        this.isLoading = false;
      }
    });
  }

  deleteEvent(eventId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.id !== eventId);
        console.log('Event deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting event:', err);
      }
    });
  }


  protected readonly RoutesEnum = RoutesEnum;
}
