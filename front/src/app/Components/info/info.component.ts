import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../../Models/company";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  infoFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient) {

  }
  ngOnInit() {
    window.scrollTo(0, 0);

    this.infoFormGroup = this.formBuilder.group({
      companyName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      beginDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      sector: new FormControl('',[Validators.required])

    })
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

  onSubmit() {
    console.log("handling the submit button");
    let companyName: string = this.infoFormGroup.controls['companyName'].value;
    let beginDate : Date = this.convertDate(this.infoFormGroup.controls['beginDate'].value);
    let endDate : Date = this.convertDate(this.infoFormGroup.controls['endDate'].value);
    let sector : string = this.infoFormGroup.controls['sector'].value;
    let country : string = this.infoFormGroup.controls['country'].value;
    const company:Company = new Company(companyName,country,sector,beginDate,endDate)
    this.persistCompany(company).subscribe(
      data => {
        console.log(data);
      }
    );
  }
  persistCompany(company :Company){
    let url="http://localhost/8080/api/calculator/add/company";
    return this.httpClient.post<string>(url,company);
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
}
