import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventFormGroup!: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.eventFormGroup = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.minLength(2)]],
      eventType: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      participants: ['', [Validators.required, Validators.min(1)]],
      venueType: ['', [Validators.required]],
      location: ['', [Validators.required]],
      numberOfDevices: ['', [Validators.required, Validators.min(0)]],
      avgPowerPerDevice: ['', [Validators.required, Validators.min(0)]],
      energyUsageHours: ['', [Validators.required, Validators.min(0)]],
      transportMode: ['', [Validators.required]],
      transportDistance: ['', [Validators.required, Validators.min(0)]],
      attendeesUsingTransport: ['', [Validators.required, Validators.min(0)]],
      mealType: ['', [Validators.required]],
      numberOfMeals: ['', [Validators.required, Validators.min(0)]],
      printedMaterial: ['', [Validators.required, Validators.min(0)]],
      decorationMaterial: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get eventName() { return this.eventFormGroup.get('eventName'); }
  get eventType() { return this.eventFormGroup.get('eventType'); }
  get duration() { return this.eventFormGroup.get('duration'); }
  get participants() { return this.eventFormGroup.get('participants'); }
  get venueType() { return this.eventFormGroup.get('venueType'); }
  get location() { return this.eventFormGroup.get('location'); }
  get numberOfDevices() { return this.eventFormGroup.get('numberOfDevices'); }
  get avgPowerPerDevice() { return this.eventFormGroup.get('avgPowerPerDevice'); }
  get energyUsageHours() { return this.eventFormGroup.get('energyUsageHours'); }
  get transportMode() { return this.eventFormGroup.get('transportMode'); }
  get transportDistance() { return this.eventFormGroup.get('transportDistance'); }
  get attendeesUsingTransport() { return this.eventFormGroup.get('attendeesUsingTransport'); }
  get mealType() { return this.eventFormGroup.get('mealType'); }
  get numberOfMeals() { return this.eventFormGroup.get('numberOfMeals'); }
  get printedMaterial() { return this.eventFormGroup.get('printedMaterial'); }
  get decorationMaterial() { return this.eventFormGroup.get('decorationMaterial'); }

  nextStep() {
    const stepControls: { [key: number]: string[] } = {
      1: ['eventName', 'eventType', 'duration', 'participants', 'venueType', 'location'],
      2: ['numberOfDevices', 'avgPowerPerDevice', 'energyUsageHours', 'transportMode', 'transportDistance', 'attendeesUsingTransport'],
      3: ['mealType', 'numberOfMeals', 'printedMaterial', 'decorationMaterial'],
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
    // Check if all fields are valid before submission
    if (this.eventFormGroup.valid) {
      console.log('Event Data:', this.eventFormGroup.value);
      this.router.navigate(['/carbon-footprint-result']);
    } else {
      this.errorMessage = 'Please fill in all required fields before submitting.';
      this.eventFormGroup.markAllAsTouched(); // Highlights invalid fields
    }
  }

}
