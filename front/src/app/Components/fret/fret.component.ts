import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Freight } from "../../Models/freight";
import { Router } from "@angular/router";
import { CarbonFootprintService } from "../../Service/carbon-footprint.service";
import { RoutesEnum } from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-fret',
  templateUrl: './fret.component.html',
  styleUrls: ['./fret.component.css']
})
export class FretComponent implements OnInit {
  fForm!: FormGroup;
  fData: Freight = new Freight();
  isSubmitting = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private carbonService: CarbonFootprintService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize Reactive Form with validation rules
    this.fForm = this.fb.group({
      freightAirLong: ['', [Validators.required, Validators.min(0)]],
      freightAirShort: ['', [Validators.required, Validators.min(0)]],
      freightSeaLong: ['', [Validators.required, Validators.min(0)]],
      freightSeaShort: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Submit form data to fret service
  onNext() {
    if (this.fForm.valid) {
      const fData: Freight = {
        freightAirLong: this.fForm.value.freightAirLong,
        freightAirShort: this.fForm.value.freightAirShort,
        freightSeaLong: this.fForm.value.freightSeaLong,
        freightSeaShort: this.fForm.value.freightSeaShort
      };

      // Update the fret service with the collected data
      this.carbonService.updateFreight(fData); // Use the updateFret method

      // Navigate to the next page (e.g., the 'Next Page' form page)
      this.router.navigate(['/' + RoutesEnum.CONSOMMABLES]);  // Replace '/nextPage' with your actual next page route
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
