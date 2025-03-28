import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { Router } from '@angular/router';
import { Company } from '../../Models/company';  // Import your Info model

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
      sector: ['', [Validators.required]]
    });
  }
  get companyName(){
    return this.infoFormGroup.get('companyName');
  }
  get beginDate(){
    return this.infoFormGroup.get('beginDate')
  }
  get endDate(){
    return this.infoFormGroup.get('endDate')
  }
  get country(){
    return this.infoFormGroup.get('country')
  }

  get sector(){
    return this.infoFormGroup.get('sector');
  }

  convertDate(date: string){
    const dateString = '20-04-2024';
    const dateParts = dateString.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Les mois commencent à 0 en JavaScript
    const year = parseInt(dateParts[2], 10);
    const dateObject = new Date(year, month, day);
    return dateObject;

  }
  onNext() {
    if (this.infoFormGroup.valid) {
      // Create an instance of the Info model with the form values
      const infoData = new Company(
        this.infoFormGroup.value.companyName,
        this.infoFormGroup.value.beginDate,
        this.infoFormGroup.value.endDate,
        this.infoFormGroup.value.country,
        this.infoFormGroup.value.sector
      );

      // Update the CarbonFootprintService with the collected data
      this.carbonService.updateInfo(infoData);

      // Navigate to the next page (e.g., the 'Energie' form page)
      this.router.navigate(['/energie']);
    } else {
      // If the form is invalid, set the error message
      this.errorMessage = 'Please fill in all required fields';
    }
  }

}
