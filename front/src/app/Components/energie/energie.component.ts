import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { Router } from '@angular/router';
import { Energy } from '../../Models/energy';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-energie',
  templateUrl: './energie.component.html',
  styleUrls: ['./energie.component.css']
})
export class EnergieComponent implements OnInit {
  energieForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private carbonService: CarbonFootprintService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.energieForm = this.fb.group({
      numberOfEmployees: ['', [Validators.required, Validators.min(1)]],
      percentageOfTelework: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      annualConsumptionOfElectricity: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfPropane: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfGas: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfFuel: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfCharcoal: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfRefrigerant: ['', [Validators.required, Validators.min(0)]],
      annualConsumptionOfGPL: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get numberOfEmployees() {
    return this.energieForm.get('numberOfEmployees');
  }

  get percentageOfTelework() {
    return this.energieForm.get('percentageOfTelework');
  }

  get annualConsumptionOfElectricity() {
    return this.energieForm.get('annualConsumptionOfElectricity');
  }

  get annualConsumptionOfPropane() {
    return this.energieForm.get('annualConsumptionOfPropane');
  }

  get annualConsumptionOfGas() {
    return this.energieForm.get('annualConsumptionOfGas');
  }

  get annualConsumptionOfFuel() {
    return this.energieForm.get('annualConsumptionOfFuel');
  }

  get annualConsumptionOfCharcoal() {
    return this.energieForm.get('annualConsumptionOfCharcoal');
  }

  get annualConsumptionOfRefrigerant() {
    return this.energieForm.get('annualConsumptionOfRefrigerant');
  }

  get annualConsumptionOfGPL() {
    return this.energieForm.get('annualConsumptionOfGPL');
  }

  onNext() {
    if (this.energieForm.valid) {
      const energyData = new Energy();
      energyData.numberOfEmployees = this.energieForm.value.numberOfEmployees;
      energyData.percentageOfTelework = this.energieForm.value.percentageOfTelework;
      energyData.annualConsumptionOfElectricity = this.energieForm.value.annualConsumptionOfElectricity;
      energyData.annualConsumptionOfPropane = this.energieForm.value.annualConsumptionOfPropane;
      energyData.annualConsumptionOfNaturalGas = this.energieForm.value.annualConsumptionOfGas;
      energyData.annualConsumptionOfFuel = this.energieForm.value.annualConsumptionOfFuel;
      energyData.annualConsumptionOfCoal = this.energieForm.value.annualConsumptionOfCharcoal;
      energyData.annualConsumptionOfRefrigerant = this.energieForm.value.annualConsumptionOfRefrigerant;
      energyData.annualConsumptionOfGPL = this.energieForm.value.annualConsumptionOfGPL;

      this.carbonService.updateEnergy(energyData);
      this.router.navigate(['/' + RoutesEnum.CARBURANT]);
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
