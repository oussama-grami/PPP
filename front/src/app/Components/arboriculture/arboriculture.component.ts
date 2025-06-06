import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesEnum } from '../../enumerations/Routes.enum';

interface CO2Result {
  annualAbsorption: number;
  totalAbsorption: number;
  equivalentCars: number;
  equivalentFlights: number;
  impactLevel: 'low' | 'medium' | 'high' | 'excellent';
  message: string;
  recommendations: string[];
}

@Component({
  selector: 'app-arboriculture',
  templateUrl: './arboriculture.component.html',
  styleUrls: ['./arboriculture.component.css'],
})
export class ArboricultureComponent {
  arboricultureForm: FormGroup = this.fb.group({
    typeArbre: ['', Validators.required],
    nbArbre: ['', [Validators.required, Validators.min(1)]],
    stade: ['', Validators.required],
    hauteur: ['', Validators.required],
  });
  displayResult = false;
  co2Result: CO2Result | null = null;
  isCalculating = false; // Add loading state

  // CO2 absorption rates by tree type (kg CO2/year for mature tree)
  private treeAbsorptionRates = {
    Olivier: 22,
    Eucalyptus: 35,
    Caroubier: 25,
    Cypres: 28,
    Alep: 30,
    Thurifere: 20,
    Cedre: 40,
    Rose: 15,
    Acacia: 32,
    Figuier: 18,
    Almondier: 20,
    Grenadier: 16,
    Chene_liege: 45,
    Chene_vert: 38,
    Micocoulier: 30,
    Peuplier: 48,
    Tamaris: 22,
    Dattier: 25,
    Marronnier: 35,
    Chene_kermes: 28,
  };

  // Stage multipliers
  private stageMultipliers = {
    Jeune: 0.3,
    Adulte: 0.7,
    Mature: 1.0,
  };

  // Height multipliers
  private heightMultipliers = {
    Plus20: 1.3,
    Entre15et20: 1.1,
    Entre11et15: 0.9,
    Moin10: 0.6,
  };

  constructor(private fb: FormBuilder) {}

  submitData() {
    if (this.arboricultureForm?.valid) {
      this.isCalculating = true;

      // Add a small delay to show loading animation
      setTimeout(() => {
        const formData = this.arboricultureForm.value;
        this.co2Result = this.calculateCO2Absorption(formData);
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
      }, 1000); // 1 second delay for dramatic effect
    }
  }

  // Add method to reset form with animation
  resetForm() {
    this.displayResult = false;
    this.co2Result = null;
    this.arboricultureForm.reset();

    // Animate form reset
    const formElement = document.querySelector('.elegant-form');
    if (formElement) {
      formElement.classList.add('form-reset-animation');
      setTimeout(() => {
        formElement.classList.remove('form-reset-animation');
      }, 600);
    }
  }

  // Add method for enhanced form field focus
  onFieldFocus(fieldName: string) {
    const fieldElement = document.querySelector(`#${fieldName}`);
    if (fieldElement) {
      fieldElement.parentElement?.classList.add('field-focused');
    }
  }

  onFieldBlur(fieldName: string) {
    const fieldElement = document.querySelector(`#${fieldName}`);
    if (fieldElement) {
      fieldElement.parentElement?.classList.remove('field-focused');
    }
  }

  private calculateCO2Absorption(data: any): CO2Result {
    const baseRate =
      this.treeAbsorptionRates[
        data.typeArbre as keyof typeof this.treeAbsorptionRates
      ];
    const stageMultiplier =
      this.stageMultipliers[data.stade as keyof typeof this.stageMultipliers];
    const heightMultiplier =
      this.heightMultipliers[
        data.hauteur as keyof typeof this.heightMultipliers
      ];

    const annualAbsorptionPerTree =
      baseRate * stageMultiplier * heightMultiplier;
    const totalAnnualAbsorption = annualAbsorptionPerTree * data.nbArbre;
    const totalLifetimeAbsorption = totalAnnualAbsorption * 25; // 25 year projection

    // Convert to tons
    const annualTons = totalAnnualAbsorption / 1000;
    const lifetimeTons = totalLifetimeAbsorption / 1000;

    // Calculate equivalents
    const equivalentCars = Math.round(totalAnnualAbsorption / 4600); // Average car emits 4.6 tons CO2/year
    const equivalentFlights = Math.round(totalAnnualAbsorption / 900); // Paris-London flight ~0.9 tons CO2

    // Determine impact level
    let impactLevel: 'low' | 'medium' | 'high' | 'excellent';
    if (annualTons < 1) impactLevel = 'low';
    else if (annualTons < 5) impactLevel = 'medium';
    else if (annualTons < 15) impactLevel = 'high';
    else impactLevel = 'excellent';

    // Generate personalized message
    const message = this.generatePersonalizedMessage(
      data,
      annualTons,
      impactLevel
    );
    const recommendations = this.generateRecommendations(data, impactLevel);

    return {
      annualAbsorption: annualTons,
      totalAbsorption: lifetimeTons,
      equivalentCars,
      equivalentFlights,
      impactLevel,
      message,
      recommendations,
    };
  }

  private generatePersonalizedMessage(
    data: any,
    annualTons: number,
    impactLevel: string
  ): string {
    const treeTypeNames = {
      Olivier: 'Olive trees',
      Eucalyptus: 'Eucalyptus trees',
      Caroubier: 'Carob trees',
      Cypres: 'Cypress trees',
      Alep: 'Aleppo Pine trees',
      Thurifere: 'Thurifer Juniper trees',
      Cedre: 'Atlas Cedar trees',
      Rose: 'Pink Laurel trees',
      Acacia: 'Acacia trees',
      Figuier: 'Fig trees',
      Almondier: 'Almond trees',
      Grenadier: 'Pomegranate trees',
      Chene_liege: 'Cork Oak trees',
      Chene_vert: 'Holm Oak trees',
      Micocoulier: 'Hackberry trees',
      Peuplier: 'Poplar trees',
      Tamaris: 'Tamarisk trees',
      Dattier: 'Date Palm trees',
      Marronnier: 'Horse Chestnut trees',
      Chene_kermes: 'Kermes Oak trees',
    };

    const treeName =
      treeTypeNames[data.typeArbre as keyof typeof treeTypeNames];
    const stageText = data.stade.toLowerCase();

    let impactText = '';
    switch (impactLevel) {
      case 'low':
        impactText = 'This is a good start for your environmental impact!';
        break;
      case 'medium':
        impactText = 'Your project shows significant environmental benefits!';
        break;
      case 'high':
        impactText =
          'Excellent! Your project will have a substantial positive impact!';
        break;
      case 'excellent':
        impactText =
          'Outstanding! Your project is a major contribution to fighting climate change!';
        break;
    }

    return `Your plantation of ${
      data.nbArbre
    } ${stageText} ${treeName} will absorb approximately ${annualTons.toFixed(
      2
    )} tons of CO2 annually. ${impactText}`;
  }

  private generateRecommendations(data: any, impactLevel: string): string[] {
    const recommendations = [];

    if (data.stade === 'Jeune') {
      recommendations.push(
        'Consider proper spacing and nutrition to optimize growth and CO2 absorption'
      );
    }

    if (data.hauteur === 'Moin10') {
      recommendations.push(
        "Regular pruning and maintenance will help maximize your trees' growth potential"
      );
    }

    if (impactLevel === 'low') {
      recommendations.push(
        'Consider expanding your project or adding complementary tree species for greater impact'
      );
    }

    if (['Eucalyptus', 'Peuplier', 'Cedre'].includes(data.typeArbre)) {
      recommendations.push(
        'These tree species are excellent CO2 absorbers - great choice!'
      );
    }

    recommendations.push(
      'Monitor your trees regularly and consider professional maintenance for optimal growth'
    );
    recommendations.push(
      "Document your project's progress to track its environmental impact over time"
    );

    return recommendations;
  }

  protected readonly RoutesEnum = RoutesEnum;
}
