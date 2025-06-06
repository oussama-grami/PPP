import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { Router } from '@angular/router';
import { Company } from '../../Models/company';
import { RoutesEnum } from "../../enumerations/Routes.enum";

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
    this.infoFormGroup = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      beginDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      activitySector: ['', [Validators.required]]
    });
  }

  get companyName() { return this.infoFormGroup.get('companyName'); }
  get beginDate() { return this.infoFormGroup.get('beginDate'); }
  get endDate() { return this.infoFormGroup.get('endDate'); }
  get country() { return this.infoFormGroup.get('country'); }
  get activitySector() { return this.infoFormGroup.get('activitySector'); }

  isEndDateBeforeBeginDate(): boolean {
    const beginDateValue = this.infoFormGroup.get('beginDate')?.value;
    const endDateValue = this.infoFormGroup.get('endDate')?.value;

    if (beginDateValue && endDateValue) {
      const beginDate = new Date(beginDateValue);
      const endDate = new Date(endDateValue);

      if (!isNaN(beginDate.getTime()) && !isNaN(endDate.getTime())) {
        return endDate < beginDate;
      }
    }
    return false;
  }

  // ✅ Properly converts 'yyyy-MM-dd' string into Date
  parseIsoDate(dateStr: string): Date {
    // This ensures it uses the correct date parts
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);  // Month is 0-based
  }

  onNext() {
    if (this.infoFormGroup.valid) {
      const raw = this.infoFormGroup.value;

      const companyData = new Company(
        raw.companyName,
        raw.country,
        raw.activitySector,
        this.parseIsoDate(raw.beginDate),  // ⬅ Correct parsing
        this.parseIsoDate(raw.endDate)
      );

      this.carbonService.updateInfo(companyData);
      this.router.navigate(['/' + RoutesEnum.ENERGIE]);
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
