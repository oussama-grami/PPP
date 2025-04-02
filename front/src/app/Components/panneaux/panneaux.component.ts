import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PanneauxService} from '../../Service/panneaux.service';
import {Panneaux} from '../../Models/panneaux';
import {HttpClient} from "@angular/common/http";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-panneaux',
  templateUrl: './panneaux.component.html',
  styleUrls: ['./panneaux.component.css']
})
export class PanneauxComponent implements OnInit {
  annualConsumption = 0;
  minRangeConsumption = 0;
  maxRangeConsumption = 0;
  displayResult = false;
  panData: Panneaux = new Panneaux();
  res!: string;
  panneauxForm!: FormGroup;
  countries: any[] = [];

  constructor(
    private panService: PanneauxService,
    private el: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.http.get<any[]>("https://restcountries.com/v3.1/all").subscribe(data => {
      this.countries = data.filter(country =>country.name.common!=="Israel").sort((a, b) => a.name.common.localeCompare(b.name.common));
    });
    this.countries.push({name: {common: ''}});
    this.panData.pays = 'Tunisie';
    this.panneauxForm = this.fb.group({
      pays: [this.panData.pays, Validators.required],
      consommation: [this.panData.consommation, [Validators.required, Validators.min(1)]]
    });
  }

  submitData() {
    if (this.panneauxForm.valid) {
      this.calculateCarbonFootprint();
      this.displayResult = true;
      this.annualConsumption = this.panneauxForm.get('consommation')?.value;
      this.minRangeConsumption = this.annualConsumption * 0.4;
      this.maxRangeConsumption = this.annualConsumption * 0.6;
      setTimeout(() => {
        const block1 = this.el.nativeElement.querySelector('#block1');
        const block2 = this.el.nativeElement.querySelector('#block2');
        const block3 = this.el.nativeElement.querySelector('#block3');
        if (block1 && block2 && block3) {
          block1.style.height = `${block2.offsetHeight + block3.offsetHeight}px`;
        }
        const targetDiv = this.el.nativeElement.querySelector('#footer');
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      this.displayResult = false;
    }
  }

  calculateCarbonFootprint() {
    if (this.panneauxForm.get('consommation')?.value && this.panneauxForm.get('consommation')?.value != 0) {
      this.displayResult = true;
      this.annualConsumption = this.panneauxForm.get('consommation')?.value / 1000 * 0.463;
      this.minRangeConsumption = this.panneauxForm.get('consommation')?.value * 20 / 1000000;
      this.maxRangeConsumption = this.panneauxForm.get('consommation')?.value * 60 / 1000000;
      setTimeout(() => {
        let targetDiv = this.el.nativeElement.querySelector('#footer');
        if (targetDiv) {
          targetDiv.scrollIntoView({behavior: 'smooth'});
        }
      }, 100);
    } else {
      this.displayResult = false;
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
