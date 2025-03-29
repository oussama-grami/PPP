import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";
import {Consommables} from "../../Models/consommables";
import {Unite} from "../../enumerations/unite";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consommables',
  templateUrl: './consommables.component.html',
  styleUrls: ['./consommables.component.css']
})
export class ConsommablesComponent implements OnInit {
  consForm!: FormGroup;
  consData: Consommables = new Consommables();
  protected readonly Unite = Unite;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private carbonService: CarbonFootprintService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize Reactive Form
    this.consForm = this.fb.group({
      montantPapier: ['', [Validators.required, Validators.min(0)]],
      unitePapier: [Unite.Dolar, [Validators.required]],
      montantFournitures: ['', [Validators.required, Validators.min(0)]],
      uniteFourniture: [Unite.Dolar, [Validators.required]]
    });
  }

  onNext(): void {
    this.isSubmitting = true;
    this.errorMessage = ''; // Reset error message before submitting

    if (this.consForm.valid) {
      const consData: Consommables = {
        montantPapier: this.consForm.value.montantPapier,
        unitePapier: this.consForm.value.unitePapier,
        montantFournitures: this.consForm.value.montantFournitures,
        uniteFourniture: this.consForm.value.uniteFourniture
      };

      // Update the CarbonFootprintService with the collected data
      this.carbonService.updateConsommable(consData);

      // Navigate to the next page (e.g., the 'Energie' form page)
      this.router.navigate(['/imob']); // Replace '/energie' with your actual next page route
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }

    // Reset the submitting state
    this.isSubmitting = false;
  }
}

