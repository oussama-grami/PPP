import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from "../../Service/carbon-footprint.service"; // Import the service
import { Carburant } from "../../Models/carburant"; // Import the Carburant model
import { Router } from "@angular/router";
import { CarburantType } from "../../enumerations/carburantType";
import { RoutesEnum } from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent implements OnInit {
  carburantForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting = false; // Prevents multiple submissions
  protected readonly TypeCarburant = CarburantType;

  constructor(
    private fb: FormBuilder,
    private carbonFootprintService: CarbonFootprintService, // Inject the service
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize the form with validators
    this.carburantForm = this.fb.group({
      dieselFuelConsumption: ['', [Validators.required, Validators.min(0)]],   // essence -> dieselFuelConsumption
      gasolineFuelConsumption: ['', [Validators.required, Validators.min(0)]], // diesel -> gasolineFuelConsumption
      lpgFuelConsumption: ['', [Validators.required, Validators.min(0)]],      // lpg -> lpgFuelConsumption
      vehicleMileage: ['', [Validators.required, Validators.min(0)]],          // kilometrage -> vehicleMileage
      fuelEfficiency: ['', [Validators.required, Validators.min(0)]],          // efficacite -> fuelEfficiency
      carburantType: ['', Validators.required]                                       // typeCarburant -> fuelType
    });
  }

  // Getters for form controls to simplify the template
  get dieselFuelConsumption() {
    return this.carburantForm.get('dieselFuelConsumption');
  }
  get gasolineFuelConsumption() {
    return this.carburantForm.get('gasolineFuelConsumption');
  }
  get lpgFuelConsumption() {
    return this.carburantForm.get('lpgFuelConsumption');
  }
  get vehicleMileage() {
    return this.carburantForm.get('vehicleMileage');
  }
  get fuelEfficiency() {
    return this.carburantForm.get('fuelEfficiency');
  }
  get fuelType() {
    return this.carburantForm.get('fuelType');
  }

  // Function for handling the Next button (for form submission)
  onNext() {
    if (this.carburantForm.valid) {
      // Create an instance of the Carburant model with the form values
      const carburantData: Carburant = {
        dieselFuelConsumption: this.carburantForm.value.dieselFuelConsumption,
        gasolineFuelConsumption: this.carburantForm.value.gasolineFuelConsumption,
        lpgFuelConsumption: this.carburantForm.value.lpgFuelConsumption,
        vehicleMileage: this.carburantForm.value.vehicleMileage,
        fuelEfficiency: this.carburantForm.value.fuelEfficiency,
        carburantType: this.carburantForm.value.fuelType
      };

      // Update the CarbonFootprintService with the collected data
      this.carbonFootprintService.updateCarburant(carburantData);

      // Navigate to the next page (e.g., the 'Aer' form page)
      this.router.navigate(['/' + RoutesEnum.AERIENS]);
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
  protected readonly CarburantType = CarburantType;
}
