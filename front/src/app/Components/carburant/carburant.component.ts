import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service"; // Import the service
import {Carburant} from "../../Models/carburant"; // Import the Carburant model
import {Router} from "@angular/router";
import {TypeCarburant} from "../../enumerations/typeCarburant";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent implements OnInit {
  carburantForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting = false; // Prevents multiple submissions
  protected readonly TypeCarburant = TypeCarburant;

  constructor(
    private fb: FormBuilder,
    private carbonFootprintService: CarbonFootprintService, // Inject the service
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize the form with validators
    this.carburantForm = this.fb.group({
      essence: ['', [Validators.required, Validators.min(0)]],
      diesel: ['', [Validators.required, Validators.min(0)]],
      gpl: ['', [Validators.required, Validators.min(0)]],
      kilometrage: ['', [Validators.required, Validators.min(0)]],
      efficacite: ['', [Validators.required, Validators.min(0)]],
      typeCarburant: ['', Validators.required]
    });
  }

  // Getters for form controls to simplify the template
  get essence() {
    return this.carburantForm.get('essence');
  }
  get diesel() {
    return this.carburantForm.get('diesel');
  }
  get gpl() {
    return this.carburantForm.get('gpl');
  }
  get kilometrage() {
    return this.carburantForm.get('kilometrage');
  }
  get efficacite() {
    return this.carburantForm.get('efficacite');
  }
  get typeCarburant() {
    return this.carburantForm.get('typeCarburant');
  }

  // Function for handling the Next button (for form submission)
  onNext() {
    if (this.carburantForm.valid) {
      // Create an instance of the Carburant model with the form values
      const carburantData: Carburant = {
        essence: this.carburantForm.value.essence,
        diesel: this.carburantForm.value.diesel,
        gpl: this.carburantForm.value.gpl,
        kilometrage: this.carburantForm.value.kilometrage,
        efficacite: this.carburantForm.value.efficacite,
        typeCarburant: this.carburantForm.value.typeCarburant
      };


      // Update the CarbonFootprintService with the collected data
      this.carbonFootprintService.updateCarburant(carburantData);

      // Navigate to the next page (e.g., the 'Aer' form page)
      this.router.navigate(['/'+RoutesEnum.AERIENS]);
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
