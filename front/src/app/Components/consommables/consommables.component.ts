import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from "../../Service/carbon-footprint.service";
import { Consumables } from "../../Models/consumables";
import { Unit } from "../../enumerations/unit";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-consommables',
  templateUrl: './consommables.component.html',
  styleUrls: ['./consommables.component.css']
})
export class ConsommablesComponent implements OnInit {
  consForm!: FormGroup;
  consData: Consumables = new Consumables();
  protected readonly Unit = Unit;
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
      expensesOnPaper: ['', [Validators.required, Validators.min(0)]],
      unitPaper: [Unit.Dolar, [Validators.required]],
      expensesOnSmallOfficeSupplies: ['', [Validators.required, Validators.min(0)]],
      unitOfficeSupplies: [Unit.Dolar, [Validators.required]]
    });
  }

  onNext(): void {
    this.isSubmitting = true;
    this.errorMessage = ''; // Reset error message before submitting

    if (this.consForm.valid) {
      const consData: Consumables = {
        expensesOnPaper: this.consForm.value.expensesOnPaper,
        unitPaper: this.consForm.value.unitPaper,
        expensesOnSmallOfficeSupplies: this.consForm.value.expensesOnSmallOfficeSupplies,
        unitOfficeSupplies: this.consForm.value.unitOfficeSupplies
      };

      // Update the CarbonFootprintService with the collected data
      this.carbonService.updateConsumables(consData);

      // Navigate to the next page (e.g., the 'Energie' form page)
      this.router.navigate(['/' + RoutesEnum.IMMOBILISATIONS]); // Replace '/energie' with your actual next page route
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }

    // Reset the submitting state
    this.isSubmitting = false;
  }

  protected readonly RoutesEnum = RoutesEnum;
}
