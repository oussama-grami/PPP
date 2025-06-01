import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from '../../Models/country';
import { CountryService } from '../../Service/country.service';
import { CompanyOwnerService } from '../../Service/company-owner.service';
import {CompanyOwner} from "../../Models/companyOwner";

@Component({
  selector: 'app-company-owner-form',
  templateUrl: './company-owner-form.component.html',
  styleUrls: ['./company-owner-form.component.css']
})
export class CompanyOwnerFormComponent implements OnInit, OnDestroy {
  companyOwnerForm: FormGroup;
  countries: Country[] = [];
  isCountriesLoading = false;
  isLoading = false;
  showSuccessMessage = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private companyOwnerService: CompanyOwnerService
  ) {
    this.companyOwnerForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      companyCode: ['', [Validators.required, Validators.minLength(2)]],
      domaine: ['', Validators.required],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-\(\)]{8,15}$/)]]
    });
  }

  private loadCountries(): void {
    this.isCountriesLoading = true;

    this.countryService.getCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (countries) => {
          this.countries = countries;
          this.autoSelectTunisia();
          this.isCountriesLoading = false;
        },
        error: (error) => {
          console.error('Error loading countries:', error);
          this.isCountriesLoading = false;
        }
      });
  }

  private autoSelectTunisia(): void {
    const tunisiaCountry = this.countryService.findTunisia(this.countries);

    if (tunisiaCountry) {
      this.companyOwnerForm.patchValue({
        country: tunisiaCountry.id,
        countryCode: tunisiaCountry.phone
      });
    }
  }

  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCountryId = parseInt(target.value);
    const selectedCountry = this.countries.find(c => c.id === selectedCountryId);

    if (selectedCountry) {
      this.companyOwnerForm.patchValue({
        countryCode: selectedCountry.phone
      });
    }
  }

  onCountryCodeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    const countryId = selectedOption.getAttribute('data-country-id');

    if (countryId) {
      this.companyOwnerForm.patchValue({
        country: parseInt(countryId)
      });
    }
  }

  formatPhoneNumber(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, '');

    // Format phone number based on length
    if (value.length >= 8) {
      if (value.length === 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
      } else if (value.length === 10) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
      }
    }

    target.value = value;
    this.companyOwnerForm.patchValue({ phone: value });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.companyOwnerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.companyOwnerForm.valid) {
      this.isLoading = true;
      const companyOwnerData = this.prepareFormData();

      // Use the actual API service or simulation
      this.companyOwnerService.simulateCreateCompanyOwner(companyOwnerData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            this.handleSuccessResponse();
          },
          error: (error) => {
            console.error('Error:', error);
            this.handleErrorResponse(error);
          }
        });
    } else {
      this.handleInvalidForm();
    }
  }

  private prepareFormData(): CompanyOwner {
    const formValue = this.companyOwnerForm.value;

    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      country: formValue.country,
      companyName: formValue.companyName,
      companyCode: formValue.companyCode,
      domaine: formValue.domaine,
      numTelephone: formValue.countryCode + formValue.phone.replace(/\s/g, ''),
      role: 'COMPANY_OWNER'
    };
  }

  private handleSuccessResponse(): void {
    this.isLoading = false;
    this.showSuccessMessage = true;

    // Reset form after successful submission
    setTimeout(() => {
      this.companyOwnerForm.reset();
      this.showSuccessMessage = false;
      this.autoSelectTunisia();
    }, 3000);
  }

  private handleErrorResponse(error: any): void {
    this.isLoading = false;

  }

  private handleInvalidForm(): void {
    // Mark all fields as touched to show validation errors
    Object.keys(this.companyOwnerForm.controls).forEach(key => {
      this.companyOwnerForm.get(key)?.markAsTouched();
    });

    const firstErrorElement = document.querySelector('.form-group.error');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private submitToActualAPI(data: CompanyOwner): void {
    this.companyOwnerService.createCompanyOwner(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.handleSuccessResponse();
        },
        error: (error) => {
          console.error('Error:', error);
          this.handleErrorResponse(error);
        }
      });
  }


  getFormCompletionPercentage(): number {
    const totalFields = Object.keys(this.companyOwnerForm.controls).length;
    const completedFields = Object.values(this.companyOwnerForm.controls)
      .filter(control => control.valid && control.value).length;
    return Math.round((completedFields / totalFields) * 100);
  }

  isPersonalComplete(): boolean {
    const personalFields = ['firstName', 'lastName', 'email', 'country', 'phone', 'countryCode'];
    return personalFields.every(field =>
      this.companyOwnerForm.get(field)?.valid && this.companyOwnerForm.get(field)?.value
    );
  }

  getMissingFieldsCount(): number {
    return Object.values(this.companyOwnerForm.controls)
      .filter(control => !control.valid || !control.value).length;
  }


}
