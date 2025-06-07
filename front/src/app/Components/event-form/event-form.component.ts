import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventFootprintService } from '../../Service/event-footprint.service';
import { Event } from '../../Models/eventForm';
import { RoutesEnum } from "../../enumerations/Routes.enum";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventFormGroup!: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';

  // Dropdown options
  eventTypeOptions = [
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'party', label: 'Party' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'other', label: 'Other' }
  ];

  venueTypeOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'conference-center', label: 'Conference Center' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'office', label: 'Office' },
    { value: 'university', label: 'University' },
    { value: 'community-center', label: 'Community Center' },
    { value: 'other', label: 'Other' }
  ];

  transportModeOptions = [
    { value: 'car', label: 'Car' },
    { value: 'bus', label: 'Bus' },
    { value: 'train', label: 'Train' },
    { value: 'plane', label: 'Plane' },
    { value: 'bike', label: 'Bike' },
    { value: 'walking', label: 'Walking' },
    { value: 'public-transport', label: 'Public Transport' },
    { value: 'other', label: 'Other' }
  ];

  mealTypeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'buffet', label: 'Buffet' },
    { value: 'cocktail', label: 'Cocktail' },
    { value: 'none', label: 'No meals' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventFootprintService: EventFootprintService
  ) {}

  ngOnInit() {
    this.eventFormGroup = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.minLength(2)]],
      eventType: ['', [Validators.required]],
      eventTypeCustom: [''],
      duration: ['', [Validators.required, Validators.min(1)]],
      participantsNbr: ['', [Validators.required, Validators.min(1)]],
      venueType: ['', [Validators.required]],
      venueTypeCustom: [''],
      location: ['', [Validators.required]],
      deviceNbr: ['', [Validators.required, Validators.min(0)]],
      avgPowerPerDevice: ['', [Validators.required, Validators.min(0)]],
      energyUsageHours: ['', [Validators.required, Validators.min(0)]],
      transportMode: ['', [Validators.required]],
      transportModeCustom: [''],
      transportDistance: ['', [Validators.required, Validators.min(0)]],
      attendeesUsingTransport: ['', [Validators.required, Validators.min(0)]],
      mealType: ['', [Validators.required]],
      mealTypeCustom: [''],
      nbrOfMeals: ['', [Validators.required, Validators.min(0)]],
      printedMaterial: ['', [Validators.required, Validators.min(0)]],
      decorationMaterial: ['', [Validators.required, Validators.min(0)]],
    });

    // Watch for 'other' selections to show custom input
    this.eventFormGroup.get('eventType')?.valueChanges.subscribe(value => {
      const customControl = this.eventFormGroup.get('eventTypeCustom');
      if (value === 'other') {
        customControl?.setValidators([Validators.required]);
      } else {
        customControl?.clearValidators();
        customControl?.setValue('');
      }
      customControl?.updateValueAndValidity();
    });

    this.eventFormGroup.get('venueType')?.valueChanges.subscribe(value => {
      const customControl = this.eventFormGroup.get('venueTypeCustom');
      if (value === 'other') {
        customControl?.setValidators([Validators.required]);
      } else {
        customControl?.clearValidators();
        customControl?.setValue('');
      }
      customControl?.updateValueAndValidity();
    });

    this.eventFormGroup.get('transportMode')?.valueChanges.subscribe(value => {
      const customControl = this.eventFormGroup.get('transportModeCustom');
      if (value === 'other') {
        customControl?.setValidators([Validators.required]);
      } else {
        customControl?.clearValidators();
        customControl?.setValue('');
      }
      customControl?.updateValueAndValidity();
    });

    this.eventFormGroup.get('mealType')?.valueChanges.subscribe(value => {
      const customControl = this.eventFormGroup.get('mealTypeCustom');
      if (value === 'other') {
        customControl?.setValidators([Validators.required]);
      } else {
        customControl?.clearValidators();
        customControl?.setValue('');
      }
      customControl?.updateValueAndValidity();
    });
  }

  // Getter methods for form controls
  get eventName() { return this.eventFormGroup.get('eventName'); }
  get eventType() { return this.eventFormGroup.get('eventType'); }
  get eventTypeCustom() { return this.eventFormGroup.get('eventTypeCustom'); }
  get duration() { return this.eventFormGroup.get('duration'); }
  get participantsNbr() { return this.eventFormGroup.get('participantsNbr'); }
  get venueType() { return this.eventFormGroup.get('venueType'); }
  get venueTypeCustom() { return this.eventFormGroup.get('venueTypeCustom'); }
  get location() { return this.eventFormGroup.get('location'); }
  get deviceNbr() { return this.eventFormGroup.get('deviceNbr'); }
  get avgPowerPerDevice() { return this.eventFormGroup.get('avgPowerPerDevice'); }
  get energyUsageHours() { return this.eventFormGroup.get('energyUsageHours'); }
  get transportMode() { return this.eventFormGroup.get('transportMode'); }
  get transportModeCustom() { return this.eventFormGroup.get('transportModeCustom'); }
  get transportDistance() { return this.eventFormGroup.get('transportDistance'); }
  get attendeesUsingTransport() { return this.eventFormGroup.get('attendeesUsingTransport'); }
  get mealType() { return this.eventFormGroup.get('mealType'); }
  get mealTypeCustom() { return this.eventFormGroup.get('mealTypeCustom'); }
  get nbrOfMeals() { return this.eventFormGroup.get('nbrOfMeals'); }
  get printedMaterial() { return this.eventFormGroup.get('printedMaterial'); }
  get decorationMaterial() { return this.eventFormGroup.get('decorationMaterial'); }

  nextStep() {
    const stepControls: { [key: number]: string[] } = {
      1: ['eventName', 'eventType', 'duration', 'participantsNbr', 'venueType', 'location'],
      2: ['deviceNbr', 'avgPowerPerDevice', 'energyUsageHours', 'transportMode', 'transportDistance', 'attendeesUsingTransport'],
      3: ['mealType', 'nbrOfMeals', 'printedMaterial', 'decorationMaterial'],
    };

    const controlsToValidate = stepControls[this.currentStep];
    let isValid = true;

    // Check main controls
    for (const controlName of controlsToValidate) {
      const control = this.eventFormGroup.get(controlName);
      if (control && control.invalid) {
        control.markAsTouched();
        isValid = false;
      }
    }

    // Check custom fields if 'other' is selected
    if (this.currentStep === 1) {
      if (this.eventType?.value === 'other' && this.eventTypeCustom?.invalid) {
        this.eventTypeCustom.markAsTouched();
        isValid = false;
      }
      if (this.venueType?.value === 'other' && this.venueTypeCustom?.invalid) {
        this.venueTypeCustom.markAsTouched();
        isValid = false;
      }
    }

    if (this.currentStep === 2) {
      if (this.transportMode?.value === 'other' && this.transportModeCustom?.invalid) {
        this.transportModeCustom.markAsTouched();
        isValid = false;
      }
    }

    if (this.currentStep === 3) {
      if (this.mealType?.value === 'other' && this.mealTypeCustom?.invalid) {
        this.mealTypeCustom.markAsTouched();
        isValid = false;
      }
    }

    if (isValid) {
      this.currentStep++;
      this.errorMessage = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.errorMessage = 'Please fill in all required fields before proceeding.';
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private prepareEventData(): Event {
    const formValue = this.eventFormGroup.value;

    // Use custom values when 'other' is selected
    const eventData: Event = {
      ...formValue,
      eventType: formValue.eventType === 'other' ? formValue.eventTypeCustom : formValue.eventType,
      venueType: formValue.venueType === 'other' ? formValue.venueTypeCustom : formValue.venueType,
      transportMode: formValue.transportMode === 'other' ? formValue.transportModeCustom : formValue.transportMode,
      mealType: formValue.mealType === 'other' ? formValue.mealTypeCustom : formValue.mealType,
    };


    return eventData;
  }

  onSubmit() {
    // Mark all fields as touched to show validation errors
    Object.keys(this.eventFormGroup.controls).forEach(key => {
      this.eventFormGroup.get(key)?.markAsTouched();
    });

    if (this.eventFormGroup.valid) {
      const eventData: Event = this.prepareEventData();

      this.eventFootprintService.createEvent(eventData).pipe(
        switchMap(() =>
          this.eventFootprintService.getEventsByCompanyOwnerId()
        )
      ).subscribe({
        next: (updatedEvents) => {
          if (updatedEvents.length > 0) {
            // Get the most recent event
            const latestEvent = updatedEvents.reduce((a, b) =>
              new Date(a.created_at).getTime() > new Date(b.created_at).getTime() ? a : b
            );
            console.log('Latest Event Id :', latestEvent.id);
            this.eventFootprintService.getEventRecommendations(latestEvent.id);
            this.router.navigate([`/${RoutesEnum.EVENT_RESULT}`, latestEvent.id]);
          } else {
            this.errorMessage = 'No events found after submission.';
          }
        },
        error: (error) => {
          console.error('Submission failed:', error);
          this.errorMessage = 'An error occurred while submitting the event. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields before submitting.';
    }
  }

  passDataToService() {
    if (this.eventFormGroup.valid) {
      const eventData: Event = this.prepareEventData();
      this.eventFootprintService.updateEventData(eventData);
    } else {
      this.errorMessage = 'Please fill in all required fields before submitting.';
    }
  }
}
