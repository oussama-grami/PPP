import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FretService } from "../../Service/fret.service";
import { Fret } from "../../Models/fret";
import { Router } from "@angular/router";
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";

@Component({
  selector: 'app-fret',
  templateUrl: './fret.component.html',
  styleUrls: ['./fret.component.css']
})
export class FretComponent implements OnInit {
  fForm!: FormGroup;
  fData: Fret = new Fret();
  isSubmitting = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private carbonService: CarbonFootprintService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize Reactive Form with validation rules
    this.fForm = this.fb.group({
      fretAerien: ['', [Validators.required, Validators.min(0)]],
      fretAerien1: ['', [Validators.required, Validators.min(0)]],
      fretMaritme: ['', [Validators.required, Validators.min(0)]],
      fretMaritme1: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Submit form data to fret service
  onNext() {
    if (this.fForm.valid) {
      const fData: Fret = {
        fretAerien: this.fForm.value.fretAerien,
        fretAerien1: this.fForm.value.fretAerien1,
        fretMaritme: this.fForm.value.fretMaritme,
        fretMaritme1: this.fForm.value.fretMaritme1
      };

      // Update the fret service with the collected data
      this.carbonService.updateFret(fData); // Use the updateFret method

      // Navigate to the next page (e.g., the 'Next Page' form page)
      this.router.navigate(['/cons']);  // Replace '/nextPage' with your actual next page route
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
