import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanneauxService } from '../../Service/panneaux.service';
import { Panneaux } from '../../Models/panneaux';
import { HttpClient } from '@angular/common/http';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-panneaux',
  templateUrl: './panneaux.component.html',
  styleUrls: ['./panneaux.component.css'],
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
  isCalculating = false;

  // Add country-specific electricity grid emission factors (kg CO2/kWh)
  private countryEmissionFactors: { [key: string]: number } = {
    // Europe
    FR: 0.0779, // France - Nuclear heavy
    DE: 0.411, // Germany
    ES: 0.252, // Spain
    IT: 0.292, // Italy
    GB: 0.231, // United Kingdom
    NL: 0.392, // Netherlands
    BE: 0.154, // Belgium
    CH: 0.029, // Switzerland - Hydro heavy
    AT: 0.159, // Austria
    SE: 0.013, // Sweden - Very clean
    NO: 0.018, // Norway - Hydro heavy
    DK: 0.165, // Denmark
    FI: 0.081, // Finland
    IE: 0.315, // Ireland
    PT: 0.252, // Portugal
    GR: 0.557, // Greece - Coal heavy
    PL: 0.765, // Poland - Coal heavy
    CZ: 0.449, // Czech Republic
    HU: 0.256, // Hungary
    SK: 0.2, // Slovakia
    SI: 0.292, // Slovenia
    HR: 0.245, // Croatia
    BG: 0.418, // Bulgaria
    RO: 0.292, // Romania
    EE: 0.691, // Estonia - Oil shale heavy
    LV: 0.109, // Latvia
    LT: 0.129, // Lithuania

    // North Africa & Middle East
    TN: 0.463, // Tunisia
    MA: 0.708, // Morocco - Coal heavy
    DZ: 0.531, // Algeria - Gas heavy
    EG: 0.502, // Egypt
    LY: 0.563, // Libya
    AE: 0.49, // UAE
    SA: 0.601, // Saudi Arabia
    QA: 0.49, // Qatar
    OM: 0.62, // Oman
    KW: 0.64, // Kuwait
    BH: 0.63, // Bahrain
    JO: 0.555, // Jordan
    LB: 0.708, // Lebanon
    SY: 0.612, // Syria
    IQ: 0.68, // Iraq
    IR: 0.641, // Iran
    PS: 0.72, // Occupied Palestine

    // Americas
    US: 0.386, // United States
    CA: 0.11, // Canada - Hydro heavy
    BR: 0.082, // Brazil - Hydro heavy
    AR: 0.366, // Argentina
    CL: 0.401, // Chile
    CO: 0.164, // Colombia

    // Asia-Pacific
    CN: 0.581, // China - Coal heavy
    IN: 0.708, // India - Coal heavy
    JP: 0.462, // Japan
    KR: 0.459, // South Korea
    AU: 0.76, // Australia - Coal heavy
    ID: 0.709, // Indonesia
    BD: 0.497, // Bangladesh
    PK: 0.489, // Pakistan
    AF: 0.62, // Afghanistan
    KZ: 0.651, // Kazakhstan
    GE: 0.064, // Georgia - Hydro heavy
    AM: 0.118, // Armenia
    AZ: 0.44, // Azerbaijan

    // Africa
    ZA: 0.928, // South Africa - Coal very heavy
    YE: 0.68, // Yemen
    RS: 0.623, // Serbia
    AL: 0.004, // Albania - Almost all hydro
    AD: 0.027, // Andorra
    AO: 0.19, // Angola
    BY: 0.34, // Belarus
    CY: 0.68, // Cyprus
    IS: 0.0, // Iceland - Geothermal/hydro
    LU: 0.259, // Luxembourg
    MT: 0.431, // Malta
    TR: 0.436, // Turkey
    UA: 0.396, // Ukraine
    RU: 0.454, // Russia
  };

  constructor(
    private panService: PanneauxService,
    private el: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    // Initialize form first with empty values
    this.panneauxForm = this.fb.group({
      pays: ['', Validators.required],
      consommation: [
        this.panData.consommation,
        [Validators.required, Validators.min(1)],
      ],
    });

    // Load countries and set default after loading
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (data) => {
        // Process all countries and replace Israel with Occupied Palestine
        this.countries = data
          .filter(
            (country) => country.name && country.name.common && country.cca2 // Ensure country has a code
          )
          .map((country) => {
            // Replace Israel with Occupied Palestine
            if (country.name.common === 'Israel' || country.cca2 === 'IL') {
              return {
                name: { common: 'Occupied Palestine' },
                cca2: 'PS', // Use Palestine's ISO code
              };
            }
            return country;
          })
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Ensure Tunisia exists as default if not already in the list
        const tunisiaExists = this.countries.find(
          (country) => country.cca2 === 'TN'
        );
        if (!tunisiaExists) {
          this.countries.unshift({
            name: { common: 'Tunisia' },
            cca2: 'TN',
          });
          // Re-sort after adding Tunisia
          this.countries.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          );
        }

        // Set default value after countries are loaded
        this.panData.pays = 'TN';
        this.panneauxForm.patchValue({
          pays: 'TN',
        });
      },
      (error) => {
        console.error('Error loading countries:', error);
        // Enhanced fallback: add more default countries including Occupied Palestine
        this.countries = [
          { name: { common: 'Afghanistan' }, cca2: 'AF' },
          { name: { common: 'Albania' }, cca2: 'AL' },
          { name: { common: 'Algeria' }, cca2: 'DZ' },
          { name: { common: 'Andorra' }, cca2: 'AD' },
          { name: { common: 'Angola' }, cca2: 'AO' },
          { name: { common: 'Argentina' }, cca2: 'AR' },
          { name: { common: 'Armenia' }, cca2: 'AM' },
          { name: { common: 'Australia' }, cca2: 'AU' },
          { name: { common: 'Austria' }, cca2: 'AT' },
          { name: { common: 'Azerbaijan' }, cca2: 'AZ' },
          { name: { common: 'Bahrain' }, cca2: 'BH' },
          { name: { common: 'Bangladesh' }, cca2: 'BD' },
          { name: { common: 'Belarus' }, cca2: 'BY' },
          { name: { common: 'Belgium' }, cca2: 'BE' },
          { name: { common: 'Brazil' }, cca2: 'BR' },
          { name: { common: 'Bulgaria' }, cca2: 'BG' },
          { name: { common: 'Canada' }, cca2: 'CA' },
          { name: { common: 'Chile' }, cca2: 'CL' },
          { name: { common: 'China' }, cca2: 'CN' },
          { name: { common: 'Colombia' }, cca2: 'CO' },
          { name: { common: 'Croatia' }, cca2: 'HR' },
          { name: { common: 'Cyprus' }, cca2: 'CY' },
          { name: { common: 'Czech Republic' }, cca2: 'CZ' },
          { name: { common: 'Denmark' }, cca2: 'DK' },
          { name: { common: 'Egypt' }, cca2: 'EG' },
          { name: { common: 'Estonia' }, cca2: 'EE' },
          { name: { common: 'Finland' }, cca2: 'FI' },
          { name: { common: 'France' }, cca2: 'FR' },
          { name: { common: 'Georgia' }, cca2: 'GE' },
          { name: { common: 'Germany' }, cca2: 'DE' },
          { name: { common: 'Greece' }, cca2: 'GR' },
          { name: { common: 'Hungary' }, cca2: 'HU' },
          { name: { common: 'Iceland' }, cca2: 'IS' },
          { name: { common: 'India' }, cca2: 'IN' },
          { name: { common: 'Indonesia' }, cca2: 'ID' },
          { name: { common: 'Iran' }, cca2: 'IR' },
          { name: { common: 'Iraq' }, cca2: 'IQ' },
          { name: { common: 'Ireland' }, cca2: 'IE' },
          { name: { common: 'Italy' }, cca2: 'IT' },
          { name: { common: 'Japan' }, cca2: 'JP' },
          { name: { common: 'Jordan' }, cca2: 'JO' },
          { name: { common: 'Kazakhstan' }, cca2: 'KZ' },
          { name: { common: 'Kuwait' }, cca2: 'KW' },
          { name: { common: 'Latvia' }, cca2: 'LV' },
          { name: { common: 'Lebanon' }, cca2: 'LB' },
          { name: { common: 'Libya' }, cca2: 'LY' },
          { name: { common: 'Lithuania' }, cca2: 'LT' },
          { name: { common: 'Luxembourg' }, cca2: 'LU' },
          { name: { common: 'Malta' }, cca2: 'MT' },
          { name: { common: 'Morocco' }, cca2: 'MA' },
          { name: { common: 'Netherlands' }, cca2: 'NL' },
          { name: { common: 'Norway' }, cca2: 'NO' },
          { name: { common: 'Occupied Palestine' }, cca2: 'PS' },
          { name: { common: 'Oman' }, cca2: 'OM' },
          { name: { common: 'Pakistan' }, cca2: 'PK' },
          { name: { common: 'Poland' }, cca2: 'PL' },
          { name: { common: 'Portugal' }, cca2: 'PT' },
          { name: { common: 'Qatar' }, cca2: 'QA' },
          { name: { common: 'Romania' }, cca2: 'RO' },
          { name: { common: 'Russia' }, cca2: 'RU' },
          { name: { common: 'Saudi Arabia' }, cca2: 'SA' },
          { name: { common: 'Serbia' }, cca2: 'RS' },
          { name: { common: 'Slovakia' }, cca2: 'SK' },
          { name: { common: 'Slovenia' }, cca2: 'SI' },
          { name: { common: 'South Africa' }, cca2: 'ZA' },
          { name: { common: 'South Korea' }, cca2: 'KR' },
          { name: { common: 'Spain' }, cca2: 'ES' },
          { name: { common: 'Sweden' }, cca2: 'SE' },
          { name: { common: 'Switzerland' }, cca2: 'CH' },
          { name: { common: 'Syria' }, cca2: 'SY' },
          { name: { common: 'Tunisia' }, cca2: 'TN' },
          { name: { common: 'Turkey' }, cca2: 'TR' },
          { name: { common: 'Ukraine' }, cca2: 'UA' },
          { name: { common: 'United Arab Emirates' }, cca2: 'AE' },
          { name: { common: 'United Kingdom' }, cca2: 'GB' },
          { name: { common: 'United States' }, cca2: 'US' },
          { name: { common: 'Yemen' }, cca2: 'YE' },
        ].sort((a, b) => a.name.common.localeCompare(b.name.common));

        this.panneauxForm.patchValue({ pays: 'TN' });
      }
    );
  }

  submitData() {
    if (this.panneauxForm.valid) {
      this.isCalculating = true;

      // Add a small delay to show calculating state
      setTimeout(() => {
        this.calculateCarbonFootprint();
        this.displayResult = true;
        this.isCalculating = false;

        // Smooth scroll to results
        setTimeout(() => {
          const resultElement = document.querySelector('.result-container');
          if (resultElement) {
            resultElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }, 800);
    } else {
      this.displayResult = false;
    }
  }

  calculateCarbonFootprint() {
    const consumption = this.panneauxForm.get('consommation')?.value;
    const selectedCountry = this.panneauxForm.get('pays')?.value;

    if (consumption && consumption != 0 && selectedCountry) {
      this.displayResult = true;

      // Get country-specific emission factor, fallback to Tunisia if not found
      const emissionFactor =
        this.countryEmissionFactors[selectedCountry] || 0.463;

      // Current energy consumption footprint (kWh to tCO2e conversion using country-specific grid emission factor)
      this.annualConsumption = (consumption / 1000) * emissionFactor;

      // Solar panel footprint range (20-60g CO2/kWh for solar PV)
      this.minRangeConsumption = (consumption * 20) / 1000000;
      this.maxRangeConsumption = (consumption * 60) / 1000000;

      // Debug logging to verify calculations
      console.log('Calculation Debug:', {
        consumption: consumption,
        country: selectedCountry,
        emissionFactor: emissionFactor,
        annualConsumption: this.annualConsumption,
        minRangeConsumption: this.minRangeConsumption,
        maxRangeConsumption: this.maxRangeConsumption,
        savings: this.annualConsumption - this.maxRangeConsumption,
      });
    } else {
      this.displayResult = false;
    }
  }

  // Add method to get impact level based on savings
  getImpactLevel(): 'low' | 'medium' | 'high' | 'excellent' {
    const savings = this.annualConsumption - this.maxRangeConsumption;
    const consumption = this.panneauxForm.get('consommation')?.value;

    // Calculate percentage of savings relative to original consumption
    const savingsPercentage = (savings / this.annualConsumption) * 100;

    if (consumption < 1000) {
      return 'low'; // Very small projects
    } else if (savingsPercentage > 95) {
      return 'excellent'; // >95% CO2 reduction
    } else if (savingsPercentage > 90) {
      return 'high'; // 90-95% CO2 reduction
    } else if (savingsPercentage > 80) {
      return 'medium'; // 80-90% CO2 reduction
    } else {
      return 'low'; // <80% CO2 reduction
    }
  }

  // Add method to get impact message
  getImpactMessage(): string {
    const impactLevel = this.getImpactLevel();
    const consumption = this.panneauxForm.get('consommation')?.value;
    const savings = this.annualConsumption - this.maxRangeConsumption;
    const savingsPercentage = (savings / this.annualConsumption) * 100;

    switch (impactLevel) {
      case 'excellent':
        return `Outstanding! Your ${consumption.toLocaleString()} kWh solar project will achieve ${savingsPercentage.toFixed(
          1
        )}% CO2 reduction - a major environmental contribution!`;
      case 'high':
        return `Excellent! Your ${consumption.toLocaleString()} kWh solar project will achieve ${savingsPercentage.toFixed(
          1
        )}% CO2 reduction compared to grid electricity.`;
      case 'medium':
        return `Good progress! Your ${consumption.toLocaleString()} kWh solar project will achieve ${savingsPercentage.toFixed(
          1
        )}% CO2 reduction compared to grid electricity.`;
      case 'low':
        if (consumption < 1000) {
          return `This is a modest but positive start. Consider expanding your project for greater environmental impact.`;
        } else {
          return `Your solar project provides environmental benefits, though the percentage reduction (${savingsPercentage.toFixed(
            1
          )}%) is moderate due to your country's grid mix.`;
        }
      default:
        return 'Your solar panel project provides environmental benefits compared to traditional energy sources.';
    }
  }

  // Add method to check if savings are meaningful
  hasMeaningfulSavings(): boolean {
    const savings = this.annualConsumption - this.maxRangeConsumption;
    return savings > 0.001; // At least 1kg CO2 savings per year
  }

  // Add method to get country name for display
  getSelectedCountryName(): string {
    const selectedCountryCode = this.panneauxForm.get('pays')?.value;
    const country = this.countries.find((c) => c.cca2 === selectedCountryCode);
    return country ? country.name.common : 'Unknown';
  }

  // Add method to get emission factor for display
  getSelectedCountryEmissionFactor(): number {
    const selectedCountry = this.panneauxForm.get('pays')?.value;
    return this.countryEmissionFactors[selectedCountry] || 0.463;
  }

  // Add method to reset form
  resetForm() {
    this.displayResult = false;
    this.panneauxForm.reset();
    this.panData.pays = 'TN';
    this.panneauxForm.patchValue({ pays: 'TN' });
  }

  // Add trackBy function for better performance
  trackByCountry(index: number, country: any): string {
    return country.cca2;
  }

  protected readonly RoutesEnum = RoutesEnum;
}
