import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { Router } from '@angular/router';
import { Company } from '../../Models/company';
import { RoutesEnum } from "../../enumerations/Routes.enum"; // Import your Routes enum

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  infoFormGroup!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private carbonService: CarbonFootprintService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize the form group with the required form controls and validators
    this.infoFormGroup = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      beginDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      activitySector: ['', [Validators.required]]  // Adjusted to use the same name as the back-end model
    });
  }

  get companyName() {
    return this.infoFormGroup.get('companyName');
  }

  get beginDate() {
    return this.infoFormGroup.get('beginDate');
  }

  get endDate() {
    return this.infoFormGroup.get('endDate');
  }

  get country() {
    return this.infoFormGroup.get('country');
  }

  get activitySector() {
    return this.infoFormGroup.get('activitySector');  // Adjusted to use the same name as the back-end model
  }

  convertDate(date: string) {
    const dateParts = date.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months start from 0 in JavaScript
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }

  onNext() {
    if (this.infoFormGroup.valid) {
      // Create an instance of the Company model with the form values
      const companyData = new Company(
        this.infoFormGroup.value.companyName,
        this.infoFormGroup.value.country,
        this.infoFormGroup.value.activitySector, // Adjusted to use the same name as the back-end model
        this.convertDate(this.infoFormGroup.value.beginDate),
        this.convertDate(this.infoFormGroup.value.endDate)
      );

      // Update the CarbonFootprintService with the collected data
      this.carbonService.updateInfo(companyData);

      // Navigate to the next page (e.g., the 'Energie' form page)
      this.router.navigate(['/' + RoutesEnum.ENERGIE]);
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
