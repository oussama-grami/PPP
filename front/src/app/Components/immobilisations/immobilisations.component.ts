import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Immobilisation} from "../../Models/immobilisation";
import {Router} from '@angular/router';
import {CarbonFootprintService} from "../../Service/carbon-footprint.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";

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
      const immeData: Immobilisation = {
        surfaceArea: this.immeForm.value.surfaceArea,
        numberOfLightVehicles: this.immeForm.value.numberOfLightVehicles,
        numberOfUtilityVehicles: this.immeForm.value.numberOfUtilityVehicles,
        numberOfHeavyVehicles: this.immeForm.value.numberOfHeavyVehicles,
        numberOfWorkstations: this.immeForm.value.numberOfWorkstations,
        numberOfPCs: this.immeForm.value.numberOfPCs,
        numberOfIndividualPrinters: this.immeForm.value.numberOfIndividualPrinters,
        numberOfMultiPrinters: this.immeForm.value.numberOfMultiPrinters,
        numberOfServers: this.immeForm.value.numberOfServers,
        numberOfMonitors: this.immeForm.value.numberOfMonitors
      };

      this.carboneService.updateImmobilisation(immeData);
      this.carboneService.submitAllData();
      this.router.navigate(['/' + RoutesEnum.RESULTAT_CARBONE]);
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
