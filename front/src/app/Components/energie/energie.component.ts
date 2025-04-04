import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarbonFootprintService} from '../../Service/carbon-footprint.service'; // Use CarbonFootprintService
import {Router} from '@angular/router';
import {Energie} from '../../Models/energie';
import {RoutesEnum} from "../../enumerations/Routes.enum"; // Assuming Energie model is defined

@Component({
  selector: 'app-energie',
  templateUrl: './energie.component.html',
  styleUrls: ['./energie.component.css']
})
export class EnergieComponent implements OnInit {
  energieForm!: FormGroup;
  errorMessage: string = '';  // To store error messages

  constructor(
    private fb: FormBuilder,
    private carbonService: CarbonFootprintService,  // Inject CarbonFootprintService
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize the Reactive Form with the updated fields from Energie model
    this.energieForm = this.fb.group({
      nbEmployee: ['', [Validators.required, Validators.min(1)]],
      pourcentageTeleTravail: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      electricite: ['', [Validators.required, Validators.min(0)]],
      propane: ['', [Validators.required, Validators.min(0)]],
      gaz: ['', [Validators.required, Validators.min(0)]],
      fioul: ['', [Validators.required, Validators.min(0)]],
      charbon: ['', [Validators.required, Validators.min(0)]],
      fluideFrig: ['', [Validators.required, Validators.min(0)]],
      gpl: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Getter for each form control (like InfoComponent)
  get nbEmployee() {
    return this.energieForm.get('nbEmployee');
  }

  get pourcentageTeleTravail() {
    return this.energieForm.get('pourcentageTeleTravail');
  }

  get electricite() {
    return this.energieForm.get('electricite');
  }

  get propane() {
    return this.energieForm.get('propane');
  }

  get gaz() {
    return this.energieForm.get('gaz');
  }

  get fioul() {
    return this.energieForm.get('fioul');
  }

  get charbon() {
    return this.energieForm.get('charbon');
  }

  get fluideFrig() {
    return this.energieForm.get('fluideFrig');
  }

  get gpl() {
    return this.energieForm.get('gpl');
  }

  // Method to handle the form submission (onNext)
  onNext() {
    if (this.energieForm.valid) {
      // Create an instance of Energie
      const energieData = new Energie();

      // Manually assign the form values to the Energie instance
      energieData.nbEmployee = this.energieForm.value.nbEmployee;
      energieData.pourcentageTeleTravail = this.energieForm.value.pourcentageTeleTravail;
      energieData.electricite = this.energieForm.value.electricite;
      energieData.propane = this.energieForm.value.propane;
      energieData.gaz = this.energieForm.value.gaz;
      energieData.fioul = this.energieForm.value.fioul;
      energieData.charbon = this.energieForm.value.charbon;
      energieData.fluideFrig = this.energieForm.value.fluideFrig;
      energieData.gpl = this.energieForm.value.gpl;

      // Update the CarbonFootprintService with the energie data
      this.carbonService.updateEnergie(energieData);

      // Navigate to the next page (e.g., the 'NextPage' form page)
      this.router.navigate(['/'+RoutesEnum.CARBURANT]);
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
