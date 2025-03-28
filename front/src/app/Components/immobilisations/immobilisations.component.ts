import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImmobilisationService } from "../../Service/immobilisation.service";
import { Immobilisation } from "../../Models/immobilisation";
import { Router } from '@angular/router';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";

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

    // Initialize Reactive Form
    this.immeForm = this.fb.group({
      surface: ['', [Validators.required, Validators.min(0)]],
      nbVoituresLegers: ['', [Validators.required, Validators.min(0)]],
      nbVoituresUtilitaires: ['', [Validators.required, Validators.min(0)]],
      nbVoituresLourds: ['', [Validators.required, Validators.min(0)]],
      nbPostes: ['', [Validators.required, Validators.min(0)]],
      nbPc: ['', [Validators.required, Validators.min(0)]],
      nbImprimantesIndiv: ['', [Validators.required, Validators.min(0)]],
      nbImprimantesMilti: ['', [Validators.required, Validators.min(0)]],
      nbServeurs: ['', [Validators.required, Validators.min(0)]],
      nbEcran: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // OnSubmit method for final submission
  onSubmit() {
    if (this.immeForm.valid) {
      const immeData: Immobilisation = {
        surface: this.immeForm.value.surface,
        nbVoituresLegers: this.immeForm.value.nbVoituresLegers,
        nbVoituresUtilitaires: this.immeForm.value.nbVoituresUtilitaires,
        nbVoituresLourds: this.immeForm.value.nbVoituresLourds,
        nbPostes: this.immeForm.value.nbPostes,
        nbPc: this.immeForm.value.nbPc,
        nbImprimantesIndiv: this.immeForm.value.nbImprimantesIndiv,
        nbImprimantesMilti: this.immeForm.value.nbImprimantesMilti,
        nbServeurs: this.immeForm.value.nbServeurs,
        nbEcran: this.immeForm.value.nbEcran
      };

      // Save the immobilisation data
      this.carboneService.updateImmobilisation(immeData);
      this.carboneService.submitAllData();
      this.router.navigate(['/resultat']);
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
