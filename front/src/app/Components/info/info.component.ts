import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { Company } from '../../Models/company';
import { RoutesEnum } from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  infoFormGroup!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Expose RoutesEnum to template
  protected readonly RoutesEnum = RoutesEnum;

  constructor(
    private formBuilder: FormBuilder,
    private carbonService: CarbonFootprintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the reactive form with validation rules
   */
  private initializeForm(): void {
    this.infoFormGroup = this.formBuilder.group({
      companyName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.noWhitespaceValidator
      ]],
      beginDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      customCountry: [''],
      activitySector: ['', [Validators.required]],
      customSector: ['']
    }, {
      validators: [this.dateRangeValidator.bind(this)]
    });

    // Add conditional validators for custom fields
    this.setupConditionalValidators();
  }

  /**
   * Setup conditional validators for custom country and sector fields
   */
  private setupConditionalValidators(): void {
    // Watch for country changes
    this.infoFormGroup.get('country')?.valueChanges.subscribe(value => {
      const customCountryControl = this.infoFormGroup.get('customCountry');

      if (value === 'other') {
        customCountryControl?.setValidators([
          Validators.required,
          Validators.minLength(2),
          this.noWhitespaceValidator
        ]);
      } else {
        customCountryControl?.clearValidators();
        customCountryControl?.setValue('');
      }
      customCountryControl?.updateValueAndValidity();
    });

    // Watch for activity sector changes
    this.infoFormGroup.get('activitySector')?.valueChanges.subscribe(value => {
      const customSectorControl = this.infoFormGroup.get('customSector');

      if (value === 'other') {
        customSectorControl?.setValidators([
          Validators.required,
          Validators.minLength(2),
          this.noWhitespaceValidator
        ]);
      } else {
        customSectorControl?.clearValidators();
        customSectorControl?.setValue('');
      }
      customSectorControl?.updateValueAndValidity();
    });
  }

  /**
   * Custom validator to prevent whitespace-only values
   */
  private noWhitespaceValidator(control: AbstractControl): {[key: string]: any} | null {
    if (control.value && typeof control.value === 'string') {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    }
    return null;
  }

  /**
   * Custom validator to ensure end date is after begin date
   */
  private dateRangeValidator(group: AbstractControl): {[key: string]: any} | null {
    const beginDate = group.get('beginDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (beginDate && endDate) {
      const begin = new Date(beginDate);
      const end = new Date(endDate);

      if (begin >= end) {
        return { 'dateRange': true };
      }
    }
    return null;
  }

  /**
   * Getter methods for form controls (for template access)
   */
  get companyName(): AbstractControl | null {
    return this.infoFormGroup.get('companyName');
  }

  get beginDate(): AbstractControl | null {
    return this.infoFormGroup.get('beginDate');
  }

  get endDate(): AbstractControl | null {
    return this.infoFormGroup.get('endDate');
  }

  get country(): AbstractControl | null {
    return this.infoFormGroup.get('country');
  }

  get customCountry(): AbstractControl | null {
    return this.infoFormGroup.get('customCountry');
  }

  get activitySector(): AbstractControl | null {
    return this.infoFormGroup.get('activitySector');
  }

  get customSector(): AbstractControl | null {
    return this.infoFormGroup.get('customSector');
  }

  /**
   * Check if end date is before begin date (for template)
   */
  isEndDateBeforeBeginDate(): boolean {
    const beginDateValue = this.beginDate?.value;
    const endDateValue = this.endDate?.value;

    if (beginDateValue && endDateValue) {
      const beginDate = new Date(beginDateValue);
      const endDate = new Date(endDateValue);

      if (!isNaN(beginDate.getTime()) && !isNaN(endDate.getTime())) {
        return endDate < beginDate;
      }
    }
    return false;
  }

  /**
   * Parse ISO date string (yyyy-MM-dd) to Date object
   * Ensures proper date handling without timezone issues
   */
  private parseIsoDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day); // Month is 0-based
  }

  /**
   * Get the final country value (either selected or custom)
   */
  private getFinalCountryValue(): string {
    const countryValue = this.country?.value;
    return countryValue === 'other' ? this.customCountry?.value || '' : countryValue || '';
  }

  /**
   * Get the final activity sector value (either selected or custom)
   */
  private getFinalSectorValue(): string {
    const sectorValue = this.activitySector?.value;
    return sectorValue === 'other' ? this.customSector?.value || '' : sectorValue || '';
  }

  /**
   * Validate form and show appropriate error messages
   */
  private validateForm(): boolean {
    // Clear previous error
    this.errorMessage = '';

    if (this.infoFormGroup.invalid) {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.infoFormGroup);

      // Set specific error messages
      if (this.companyName?.errors) {
        this.errorMessage = 'Please enter a valid company name (minimum 2 characters)';
      } else if (this.beginDate?.errors || this.endDate?.errors) {
        this.errorMessage = 'Please select valid assessment dates';
      } else if (this.isEndDateBeforeBeginDate()) {
        this.errorMessage = 'End date must be after the start date';
      } else if (this.country?.errors || (this.country?.value === 'other' && this.customCountry?.errors)) {
        this.errorMessage = 'Please select or specify your country';
      } else if (this.activitySector?.errors || (this.activitySector?.value === 'other' && this.customSector?.errors)) {
        this.errorMessage = 'Please select or specify your activity sector';
      } else {
        this.errorMessage = 'Please fill in all required fields correctly';
      }

      return false;
    }

    return true;
  }

  /**
   * Mark all form controls as touched to trigger validation display
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Handle form submission
   */
  async onNext(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const formValue = this.infoFormGroup.value;

      // Create company data object
      const companyData = new Company(
        formValue.companyName.trim(),
        this.getFinalCountryValue(),
        this.getFinalSectorValue(),
        this.parseIsoDate(formValue.beginDate),
        this.parseIsoDate(formValue.endDate)
      );

      // Update service with company data
      this.carbonService.updateInfo(companyData);

      // Navigate to next step
      await this.router.navigate(['/' + RoutesEnum.ENERGIE]);

    } catch (error) {
      console.error('Error submitting form:', error);
      this.errorMessage = 'An error occurred while processing your information. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Handle form reset
   */
  onReset(): void {
    this.infoFormGroup.reset();
    this.errorMessage = '';
  }

  /**
   * Get form control error message
   */
  getControlErrorMessage(controlName: string): string {
    const control = this.infoFormGroup.get(controlName);

    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getControlDisplayName(controlName)} is required`;
      }
      if (control.errors['minlength']) {
        return `${this.getControlDisplayName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${this.getControlDisplayName(controlName)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['whitespace']) {
        return `${this.getControlDisplayName(controlName)} cannot be empty or contain only spaces`;
      }
    }

    return '';
  }

  /**
   * Get user-friendly control display name
   */
  private getControlDisplayName(controlName: string): string {
    const displayNames: { [key: string]: string } = {
      'companyName': 'Company name',
      'beginDate': 'Start date',
      'endDate': 'End date',
      'country': 'Country',
      'customCountry': 'Custom country',
      'activitySector': 'Activity sector',
      'customSector': 'Custom activity sector'
    };

    return displayNames[controlName] || controlName;
  }
}
