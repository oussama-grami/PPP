import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventFootprintService } from '../../Service/event-footprint.service'; // Import the service
import { Event } from '../../Models/eventForm';
import { RoutesEnum } from "../../enumerations/Routes.enum";
import {switchMap} from "rxjs/operators"; // Import the model

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventFormGroup!: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventFootprintService: EventFootprintService // Inject the service
  ) {

  }

  ngOnInit() {
    this.eventFormGroup = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.minLength(2)]],
      eventType: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      participantsNbr: ['', [Validators.required, Validators.min(1)]],
      venueType: ['', [Validators.required]],
      location: ['', [Validators.required]],
      deviceNbr: ['', [Validators.required, Validators.min(0)]],
      avgPowerPerDevice: ['', [Validators.required, Validators.min(0)]],
      energyUsageHours: ['', [Validators.required, Validators.min(0)]],
      transportMode: ['', [Validators.required]],
      transportDistance: ['', [Validators.required, Validators.min(0)]],
      attendeesUsingTransport: ['', [Validators.required, Validators.min(0)]],
      mealType: ['', [Validators.required]],
      nbrOfMeals: ['', [Validators.required, Validators.min(0)]],
      printedMaterial: ['', [Validators.required, Validators.min(0)]],
      decorationMaterial: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get eventName() { return this.eventFormGroup.get('eventName'); }
  get eventType() { return this.eventFormGroup.get('eventType'); }
  get duration() { return this.eventFormGroup.get('duration'); }
  get participantsNbr() { return this.eventFormGroup.get('participantsNbr'); }
  get venueType() { return this.eventFormGroup.get('venueType'); }
  get location() { return this.eventFormGroup.get('location'); }
  get deviceNbr() { return this.eventFormGroup.get('deviceNbr'); }
  get avgPowerPerDevice() { return this.eventFormGroup.get('avgPowerPerDevice'); }
  get energyUsageHours() { return this.eventFormGroup.get('energyUsageHours'); }
  get transportMode() { return this.eventFormGroup.get('transportMode'); }
  get transportDistance() { return this.eventFormGroup.get('transportDistance'); }
  get attendeesUsingTransport() { return this.eventFormGroup.get('attendeesUsingTransport'); }
  get mealType() { return this.eventFormGroup.get('mealType'); }
  get nbrOfMeals() { return this.eventFormGroup.get('nbrOfMeals'); }
  get printedMaterial() { return this.eventFormGroup.get('printedMaterial'); }
  get decorationMaterial() { return this.eventFormGroup.get('decorationMaterial'); }

  passDataToService() {
    if (this.eventFormGroup.valid) {
      const eventData: Event = this.eventFormGroup.value; // Get form data and map to model
      this.eventFootprintService.updateEventData(eventData); // Pass the data to the service
    } else {
      this.errorMessage = 'Please fill in all required fields before submitting.';
    }
  }

  nextStep() {
    const stepControls: { [key: number]: string[] } = {
      1: ['eventName', 'eventType', 'duration', 'participantsNbr', 'venueType', 'location'],
      2: ['deviceNbr', 'avgPowerPerDevice', 'energyUsageHours', 'transportMode', 'transportDistance', 'attendeesUsingTransport'],
      3: ['mealType', 'nbrOfMeals', 'printedMaterial', 'decorationMaterial'],
    };

    const controlsToValidate = stepControls[this.currentStep];

    if (controlsToValidate.every(control => this.eventFormGroup.get(control)?.valid)) {
      this.currentStep++;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill in all required fields before proceeding.';
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.eventFormGroup.valid) {
      const eventData: Event = this.eventFormGroup.value;
      this.eventFootprintService.createEvent(eventData).pipe(
        switchMap(() =>
          this.eventFootprintService.getEventsByCompanyOwnerId()
        )
      ).subscribe({
        next: (updatedEvents) => {
          if (updatedEvents.length > 0) {
            // On suppose que le dernier est le plus récent
            const latestEvent = updatedEvents.reduce((a, b) =>
              new Date(a.created_at).getTime() > new Date(b.created_at).getTime() ? a : b
            );

            console.log('Latest event:', latestEvent);
            this.router.navigate([`/${RoutesEnum.EVENT_RESULT}`, latestEvent.id]);
          } else {
            this.errorMessage = 'No events found after submission.';
          }
        },
        error: (error) => {
          console.error('Submission failed:', error);
          this.errorMessage = 'An error occurred while submitting the event.';
        }
      });

    } else {
      this.errorMessage = 'Please fill in all required fields before submitting.';
    }
  }

}
