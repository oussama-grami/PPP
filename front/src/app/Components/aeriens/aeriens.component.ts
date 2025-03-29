import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";
import {DeplacemetAerien} from "../../Models/deplacemetAerien";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aeriens',
  templateUrl: './aeriens.component.html',
  styleUrls: ['./aeriens.component.css']
})
export class AeriensComponent implements OnInit {
  depForm!: FormGroup;
  depData: DeplacemetAerien = new DeplacemetAerien();
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private carbonService: CarbonFootprintService, // Use carbon-footprint.service
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize Reactive Form with validation rules
    this.depForm = this.fb.group({
      nbrArretRetourC: ['', [Validators.required, Validators.min(0)]],
      nbrArretRetourM: ['', [Validators.required, Validators.min(0)]],
      nbrArretRetourL: ['', [Validators.required, Validators.min(0)]]
    });
  }
  get nbrArretRetourC() {
    return this.depForm.get('nbrArretRetourC');
  }

  get nbrArretRetourM() {
    return this.depForm.get('nbrArretRetourM');
  }

  get nbrArretRetourL() {
    return this.depForm.get('nbrArretRetourL');
  }

  // Submit form data to carbon-footprint.service
  onNext() {
    if (this.depForm.valid) {
      const depData: DeplacemetAerien = {
        nbrArretRetourC: this.depForm.value.nbrArretRetourC,
        nbrArretRetourM: this.depForm.value.nbrArretRetourM,
        nbrArretRetourL: this.depForm.value.nbrArretRetourL
      };

      // Update the carbon footprint service with the collected data
      this.carbonService.updateDeplacementAerien(depData); // Use the updateDeplacementAerien method

      // Navigate to the next page (e.g., the 'Next Page' form page)
      this.router.navigate(['/fret']);  // Replace '/nextPage' with your actual next page route
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
