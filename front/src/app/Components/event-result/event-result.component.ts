import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventFootprintService } from '../../Service/event-footprint.service';
import { EventResponse } from '../../Models/eventResponse';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.css']
})
export class EventResultComponent implements OnInit {
  totalCarbonFootprint: number = 0;
  latestEvent: EventResponse | null = null;

  constructor(
    private eventFootprintService: EventFootprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the :id from the URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      console.error('No event ID provided in route');
      return;
    }

    // Get event by ID
    this.eventFootprintService.getEventById(id).subscribe({
      next: (event) => {
        this.latestEvent = event;

        // Get total footprint
        this.eventFootprintService.getTotalFootprint(event.id).subscribe({
          next: (total) => {
            this.totalCarbonFootprint = total;
          },
          error: () => {
            this.totalCarbonFootprint = 0;
          }
        });
      },
      error: () => {
        console.error('Failed to load event by ID');
      }
    });
  }

  protected readonly RoutesEnum = RoutesEnum;
}
