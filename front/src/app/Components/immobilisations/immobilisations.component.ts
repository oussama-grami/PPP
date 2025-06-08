import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Immobilisation } from "../../Models/immobilisation";
import { Router } from '@angular/router';
import { CarbonFootprintService } from "../../Service/carbon-footprint.service";
import { RoutesEnum } from "../../enumerations/Routes.enum";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-immobilisations',
  templateUrl: './immobilisations.component.html',
  styleUrls: ['./immobilisations.component.css']
})
export class ImmobilisationsComponent implements OnInit {
  immeForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private carboneService: CarbonFootprintService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.immeForm = this.fb.group({
      surfaceArea: ['', [Validators.required, Validators.min(0)]],
      numberOfLightVehicles: ['', [Validators.required, Validators.min(0)]],
      numberOfUtilityVehicles: ['', [Validators.required, Validators.min(0)]],
      numberOfHeavyVehicles: ['', [Validators.required, Validators.min(0)]],
      numberOfWorkstations: ['', [Validators.required, Validators.min(0)]],
      numberOfPCs: ['', [Validators.required, Validators.min(0)]],
      numberOfIndividualPrinters: ['', [Validators.required, Validators.min(0)]],
      numberOfMultiPrinters: ['', [Validators.required, Validators.min(0)]],
      numberOfServers: ['', [Validators.required, Validators.min(0)]],
      numberOfMonitors: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.immeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const immeData: Immobilisation = this.immeForm.value;
      this.carboneService.updateImmobilisation(immeData);

      this.carboneService.submitAllData().pipe(
        switchMap(() =>
          this.carboneService.getAllByCompanyOwnerId().pipe(
            switchMap((calculations) => {
              if (calculations.length > 0) {
                return this.carboneService.getLastCalculation();
              } else {
                this.errorMessage = 'No estimation found.';
                return of(null);
              }
            })
          )
        )
      ).subscribe({
        next: (latestCalculation) => {
          this.isLoading = false;
          if (latestCalculation) {
            this.carboneService.getEnterpriseRecommendations(latestCalculation.id);
            this.router.navigate(['/' + RoutesEnum.RESULTAT_CARBONE, latestCalculation.id]);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error during submission or result retrieval:', err);
          this.errorMessage = 'An error occurred during submission or result retrieval.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
