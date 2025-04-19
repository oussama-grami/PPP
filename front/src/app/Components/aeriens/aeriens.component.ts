import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from "../../Service/carbon-footprint.service";
import { Aerien } from "../../Models/aerien";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-aeriens',
  templateUrl: './aeriens.component.html',
  styleUrls: ['./aeriens.component.css']
})
export class AeriensComponent implements OnInit {
  depForm!: FormGroup;
  aerienData: Aerien = new Aerien();
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
      numberOfShortHaulRoundTrips: ['', [Validators.required, Validators.min(0)]],
      numberOfMediumHaulRoundTrips: ['', [Validators.required, Validators.min(0)]],
      numberOfLongHaulRoundTrips: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get numberOfShortHaulRoundTrips() {
    return this.depForm.get('numberOfShortHaulRoundTrips');
  }

  get numberOfMediumHaulRoundTrips() {
    return this.depForm.get('numberOfMediumHaulRoundTrips');
  }

  get numberOfLongHaulRoundTrips() {
    return this.depForm.get('numberOfLongHaulRoundTrips');
  }

  onNext() {
    if (this.depForm.valid) {
      const aerienData: Aerien = {
        numberOfShortHaulRoundTrips: this.depForm.value.numberOfShortHaulRoundTrips,
        numberOfMediumHaulRoundTrips: this.depForm.value.numberOfMediumHaulRoundTrips,
        numberOfLongHaulRoundTrips: this.depForm.value.numberOfLongHaulRoundTrips
      };

      this.carbonService.updateAerien(aerienData);
      this.router.navigate(['/' + RoutesEnum.CONSOMMABLES]);
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
