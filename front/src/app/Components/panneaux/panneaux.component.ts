import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesEnum } from '../../enumerations/Routes.enum';

interface Country {
  name: { common: string };
  cca2: string;
}

@Component({
  selector: 'app-panneaux',
  templateUrl: './panneaux.component.html',
  styleUrls: ['./panneaux.component.css'],
})
export class PanneauxComponent implements OnInit {
  panneauxForm: FormGroup;
  displayResult = false;
  isCalculating = false;
  showAdditionalInfo = false;

  // Results data
  annualConsumption = 0;
  minRangeConsumption = 0;
  maxRangeConsumption = 0;

  // Countries data with emission factors (tCO2e/kWh)
  countries: Country[] = [
    { name: { common: 'Tunisia' }, cca2: 'TN' },
    { name: { common: 'France' }, cca2: 'FR' },
    { name: { common: 'Germany' }, cca2: 'DE' },
    { name: { common: 'United States' }, cca2: 'US' },
    { name: { common: 'China' }, cca2: 'CN' },
    { name: { common: 'India' }, cca2: 'IN' },
    { name: { common: 'Japan' }, cca2: 'JP' },
    { name: { common: 'United Kingdom' }, cca2: 'GB' },
    { name: { common: 'Canada' }, cca2: 'CA' },
    { name: { common: 'Australia' }, cca2: 'AU' },
    { name: { common: 'Brazil' }, cca2: 'BR' },
    { name: { common: 'South Africa' }, cca2: 'ZA' },
    { name: { common: 'Morocco' }, cca2: 'MA' },
    { name: { common: 'Algeria' }, cca2: 'DZ' },
    { name: { common: 'Egypt' }, cca2: 'EG' },
  ];

  // Emission factors by country (tCO2e/kWh)
  private emissionFactors: { [key: string]: number } = {
    TN: 0.000441, // Tunisia - 441g CO2/kWh
    FR: 0.000057, // France - 57g CO2/kWh
    DE: 0.000401, // Germany - 401g CO2/kWh
    US: 0.000386, // United States - 386g CO2/kWh
    CN: 0.000555, // China - 555g CO2/kWh
    IN: 0.000708, // India - 708g CO2/kWh
    JP: 0.000462, // Japan - 462g CO2/kWh
    GB: 0.000233, // United Kingdom - 233g CO2/kWh
    CA: 0.00013, // Canada - 130g CO2/kWh
    AU: 0.000634, // Australia - 634g CO2/kWh
    BR: 0.000074, // Brazil - 74g CO2/kWh
    ZA: 0.000928, // South Africa - 928g CO2/kWh
    MA: 0.000707, // Morocco - 707g CO2/kWh
    DZ: 0.000631, // Algeria - 631g CO2/kWh
    EG: 0.000535, // Egypt - 535g CO2/kWh
  };

  constructor(private fb: FormBuilder) {
    this.panneauxForm = this.fb.group({
      pays: ['TN', Validators.required],
      consommation: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.panneauxForm.patchValue({ pays: 'TN' });
  }

  trackByCountry(index: number, country: Country): string {
    return country.cca2;
  }

  submitData() {
    if (this.panneauxForm.valid) {
      this.isCalculating = true;

      setTimeout(() => {
        this.calculateSolarImpact();
        this.displayResult = true;
        this.isCalculating = false;

        setTimeout(() => {
          const resultElement = document.querySelector('.result-container');
          if (resultElement) {
            resultElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }, 1000);
    }
  }

  private calculateSolarImpact() {
    const formData = this.panneauxForm.value;
    const consumption = parseFloat(formData.consommation); // kWh/year
    const emissionFactor = this.getSelectedCountryEmissionFactor(); // tCO2e/kWh

    // Calculate grid electricity emissions (baseline) - tons CO2 per year
    this.annualConsumption = consumption * emissionFactor;

    // Solar panel lifecycle emissions range (20-60g CO2/kWh over 25 years)
    // Convert to tons: g/kWh * 0.000001 = tCO2/kWh
    const solarEmissionMin = consumption * 0.00002; // 20g/kWh = 0.020 tons CO2 per year
    const solarEmissionMax = consumption * 0.00006; // 60g/kWh = 0.060 tons CO2 per year

    this.minRangeConsumption = solarEmissionMin;
    this.maxRangeConsumption = solarEmissionMax;

    // Debug logging
    console.log('Calculation Debug:', {
      consumption: consumption + ' kWh/year',
      emissionFactor: emissionFactor + ' tCO2e/kWh',
      gridEmissions: this.annualConsumption + ' tCO2e/year',
      solarEmissionsMin: this.minRangeConsumption + ' tCO2e/year',
      solarEmissionsMax: this.maxRangeConsumption + ' tCO2e/year',
      savings:
        this.annualConsumption - this.maxRangeConsumption + ' tCO2e/year',
      correctPercentage: this.getReductionPercentage() + '%',
    });
  }

  getSelectedCountryEmissionFactor(): number {
    const selectedCountry = this.panneauxForm.get('pays')?.value;
    return this.emissionFactors[selectedCountry] || 0.000441;
  }

  getSelectedCountryName(): string {
    const selectedCountryCode = this.panneauxForm.get('pays')?.value;
    const country = this.countries.find((c) => c.cca2 === selectedCountryCode);
    return country?.name.common || 'Unknown';
  }

  getImpactLevel(): string {
    const consumption = this.panneauxForm.get('consommation')?.value;
    const reductionPercentage = this.getReductionPercentage();
    const annualSavings = this.annualConsumption - this.maxRangeConsumption;

    // Consider both emission reduction percentage AND project scale
    let impactLevel: 'low' | 'medium' | 'high' | 'excellent';

    // For very small projects (less than 1000 kWh), cap the impact level
    if (consumption < 1000) {
      impactLevel = 'low';
    } else if (consumption < 3000) {
      // Small to medium projects - cap at medium even with high emission reduction
      if (reductionPercentage >= 85) {
        impactLevel = 'medium';
      } else if (reductionPercentage >= 70) {
        impactLevel = 'low';
      } else {
        impactLevel = 'low';
      }
    } else if (consumption < 10000) {
      // Medium projects - allow high impact for good emission reduction
      if (reductionPercentage >= 90) {
        impactLevel = 'high';
      } else if (reductionPercentage >= 80) {
        impactLevel = 'medium';
      } else if (reductionPercentage >= 60) {
        impactLevel = 'low';
      } else {
        impactLevel = 'low';
      }
    } else {
      // Large projects - allow excellent impact
      if (reductionPercentage >= 85 && annualSavings >= 3) {
        impactLevel = 'excellent';
      } else if (reductionPercentage >= 75 && annualSavings >= 1.5) {
        impactLevel = 'high';
      } else if (reductionPercentage >= 60) {
        impactLevel = 'medium';
      } else {
        impactLevel = 'low';
      }
    }

    console.log('Impact Level Calculation:', {
      consumption: consumption,
      reductionPercentage: reductionPercentage,
      annualSavings: annualSavings,
      impactLevel: impactLevel,
      gridFactor: this.getSelectedCountryEmissionFactor(),
      country: this.getSelectedCountryName(),
    });

    return impactLevel;
  }

  // Fixed percentage calculation method - shows actual project CO2 reduction
  getReductionPercentage(): number {
    const gridEmissionFactor = this.getSelectedCountryEmissionFactor();
    const solarEmissionMax = 0.00006; // 60g CO2/kWh worst case

    // This is ALWAYS the same for a given country because it compares
    // emission intensity per kWh, not total project emissions
    const reductionPercentage =
      ((gridEmissionFactor - solarEmissionMax) / gridEmissionFactor) * 100;

    return Math.max(0, reductionPercentage);
  }

  // Add a method to show the PROJECT SCALE percentage (which DOES vary)
  getProjectScalePercentage(): number {
    // This shows how much this specific project contributes to meaningful change
    const consumption = this.panneauxForm.get('consommation')?.value;
    const annualSavings = this.annualConsumption - this.maxRangeConsumption;

    // Create a scale where 10 tons CO2 saved = 100% "meaningful impact"
    const meaningfulThreshold = 10; // tons CO2/year
    const projectScale = Math.min(
      100,
      (annualSavings / meaningfulThreshold) * 100
    );

    return Math.max(0, projectScale);
  }

  // Add method to explain the difference
  getPercentageExplanation(): string {
    const emissionReduction = this.getReductionPercentage();
    const scalePercentage = this.getProjectScalePercentage();

    return `Emission Intensity Reduction: ${emissionReduction.toFixed(
      1
    )}% (constant for ${this.getSelectedCountryName()})
Project Scale Impact: ${scalePercentage.toFixed(
      1
    )}% (varies with project size)`;
  }

  getImpactMessage(): string {
    const countryName = this.getSelectedCountryName();
    const consumption = this.panneauxForm.get('consommation')?.value;
    const reductionPercentage = this.getReductionPercentage();
    const annualSavings = this.annualConsumption - this.maxRangeConsumption;

    const impactLevel = this.getImpactLevel();

    const messages = {
      excellent: `Outstanding environmental impact! Your ${this.formatNumber(
        consumption
      )} kWh solar project in ${countryName} achieves ${reductionPercentage.toFixed(
        1
      )}% emission reduction and saves ${this.formatNumber(
        annualSavings,
        'tons'
      )} tons CO2 annually. This large-scale project represents a major contribution to climate action and energy independence.`,

      high: `Excellent environmental benefits! Your ${this.formatNumber(
        consumption
      )} kWh solar installation in ${countryName} delivers ${reductionPercentage.toFixed(
        1
      )}% emission reduction, saving ${this.formatNumber(
        annualSavings,
        'tons'
      )} tons CO2 annually. This substantial project makes a significant positive impact on reducing carbon emissions.`,

      medium: `Good environmental impact! Your ${this.formatNumber(
        consumption
      )} kWh project in ${countryName} provides ${reductionPercentage.toFixed(
        1
      )}% emission reduction, saving ${this.formatNumber(
        annualSavings,
        'tons'
      )} tons annually. Consider expanding your capacity to maximize environmental benefits and achieve greater impact.`,

      low: `Positive first step! Your ${this.formatNumber(
        consumption
      )} kWh project achieves ${reductionPercentage.toFixed(
        1
      )}% emission reduction in ${countryName}, saving ${this.formatNumber(
        annualSavings,
        'tons'
      )} tons CO2 annually. While beneficial, consider significantly expanding your solar capacity for meaningful environmental impact.`,
    };

    return messages[impactLevel as keyof typeof messages];
  }

  hasMeaningfulSavings(): boolean {
    const savings = this.annualConsumption - this.maxRangeConsumption;
    const consumption = this.panneauxForm.get('consommation')?.value;

    // More realistic thresholds for meaningful savings
    if (consumption < 1000) {
      return false; // Very small projects are not considered meaningful
    } else if (consumption < 3000) {
      return savings >= 0.3; // Small projects need at least 0.3 tons savings
    } else if (consumption < 10000) {
      return savings >= 1.0; // Medium projects need at least 1 ton savings
    } else {
      return savings >= 2.0; // Large projects need at least 2 tons savings
    }
  }

  // Add method to get project scale assessment
  getProjectScale(): string {
    const consumption = this.panneauxForm.get('consommation')?.value;

    if (consumption < 1000) return 'Very Small';
    if (consumption < 3000) return 'Small';
    if (consumption < 10000) return 'Medium';
    if (consumption < 25000) return 'Large';
    return 'Very Large';
  }

  // Add method to get scale-appropriate recommendations
  getScaleRecommendations(): string[] {
    const consumption = this.panneauxForm.get('consommation')?.value;
    const recommendations = [];

    if (consumption < 1000) {
      recommendations.push(
        'Consider expanding to at least 1,000 kWh/year for meaningful environmental impact'
      );
      recommendations.push(
        'Small residential systems typically start at 2,000-4,000 kWh/year'
      );
    } else if (consumption < 3000) {
      recommendations.push(
        'Good start! Consider expanding to 5,000+ kWh/year for greater impact'
      );
      recommendations.push(
        'Adding battery storage could maximize your solar energy utilization'
      );
    } else if (consumption < 10000) {
      recommendations.push(
        'Excellent project size with substantial environmental benefits'
      );
      recommendations.push(
        'Consider energy efficiency measures to maximize the impact of your solar installation'
      );
    } else {
      recommendations.push(
        'Large-scale project with significant positive environmental impact'
      );
      recommendations.push(
        'Consider becoming a renewable energy advocate in your community'
      );
    }

    return recommendations;
  }

  // Add number formatting utility
  formatNumber(value: number, unit?: string): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M' + (unit ? ' ' + unit : '');
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K' + (unit ? ' ' + unit : '');
    } else if (value >= 1) {
      return value.toFixed(2) + (unit ? ' ' + unit : '');
    } else {
      return value.toFixed(3) + (unit ? ' ' + unit : '');
    }
  }

  // Add method to get emission factor in grams for display
  getEmissionFactorInGrams(): number {
    return this.getSelectedCountryEmissionFactor() * 1000000; // Convert tCO2/kWh to gCO2/kWh
  }

  toggleAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;

    if (this.showAdditionalInfo) {
      setTimeout(() => {
        const expandedSection = document.querySelector(
          '.info-additional.expanded'
        );
        if (expandedSection) {
          expandedSection.classList.add('ensure-visibility');

          expandedSection.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });

          setTimeout(() => {
            expandedSection.classList.remove('ensure-visibility');
          }, 1000);
        }
      }, 100);
    }
  }

  resetForm() {
    this.displayResult = false;
    this.showAdditionalInfo = false;
    this.panneauxForm.reset();
    this.panneauxForm.patchValue({ pays: 'TN' });

    const formElement = document.querySelector('.form-intro');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
