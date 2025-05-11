import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Immobilisation} from "../../Models/immobilisation";
import {Router} from '@angular/router';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-immobilisations',
  templateUrl: './immobilisations.component.html',
  styleUrls: ['./immobilisations.component.css']
})
export class ImmobilisationsComponent implements OnInit {
  immeForm!: FormGroup;
  errorMessage: string = '';

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
      const immeData: Immobilisation = this.immeForm.value;
      this.carboneService.updateImmobilisation(immeData);

      this.carboneService.submitAllData().pipe(
        switchMap(() =>
          this.carboneService.getAllByCompanyOwnerId(7).pipe(
            switchMap((calculations) => {
              if (calculations.length > 0) {
                return this.carboneService.getLastCalculation(7);
              } else {
                this.errorMessage = 'Aucune estimation de carbone trouvée pour cette entreprise.';
                return of(null); // return observable with null to keep stream alive
              }
            })
          )
        )
      ).subscribe({
        next: (latestCalculation) => {
          if (latestCalculation) {
            this.router.navigate(['/' + RoutesEnum.RESULTAT_CARBONE, latestCalculation.id]);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la soumission ou de la récupération des résultats :', err);
          this.errorMessage = 'Une erreur est survenue pendant la soumission ou la récupération des résultats.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement.';
    }
  }





  protected readonly RoutesEnum = RoutesEnum;
}
