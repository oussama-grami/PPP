import { Component, OnInit } from '@angular/core';
import { EventFootprintService } from '../../Service/event-footprint.service'; // Import the service

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.css'],
})
export class EventResultComponent implements OnInit {
  totalCarbonFootprint: number = 0;

  constructor(private eventFootprintService: EventFootprintService) {}

  ngOnInit(): void {
    // Get the static total carbon footprint from the service
    this.eventFootprintService.submitEventData();
    this.totalCarbonFootprint = this.eventFootprintService.getTotalFootprint();
  }
}
