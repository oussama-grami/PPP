import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  // Input properties
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 7;
  @Input() steps: string[] = [];
  @Input() title: string = '';
  @Input() showLabels: boolean = true;
  @Input() dotStyle: boolean = false;

  // Default step labels if none provided
  private defaultSteps: string[] = [
    'General Information',
    'Energy',
    'Fuel',
    'Business Air Travel',
    'Freight',
    'Office Supplies',
    'Fixed Assets'
  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeSteps();
    this.validateInputs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep'] || changes['totalSteps']) {
      this.validateInputs();
    }
    if (changes['steps'] || changes['totalSteps']) {
      this.initializeSteps();
    }
  }

  /**
   * Initialize steps array with default or custom labels
   */
  private initializeSteps(): void {
    if (!this.steps || this.steps.length === 0) {
      this.steps = this.defaultSteps.slice(0, this.totalSteps);
    } else if (this.steps.length !== this.totalSteps) {
      // Adjust steps array to match totalSteps
      if (this.steps.length < this.totalSteps) {
        // Pad with default steps
        const remaining = this.totalSteps - this.steps.length;
        const defaultRemainder = this.defaultSteps.slice(this.steps.length, this.totalSteps);
        this.steps = [...this.steps, ...defaultRemainder];
      } else {
        // Trim to totalSteps
        this.steps = this.steps.slice(0, this.totalSteps);
      }
    }
  }

  /**
   * Validate input properties
   */
  private validateInputs(): void {
    // Ensure currentStep is within valid range
    if (this.currentStep < 1) {
      this.currentStep = 1;
    } else if (this.currentStep > this.totalSteps) {
      this.currentStep = this.totalSteps;
    }

    // Ensure totalSteps is at least 1
    if (this.totalSteps < 1) {
      this.totalSteps = 1;
    }
  }

  /**
   * Calculate progress percentage based on current step
   */
  getProgressPercentage(): number {
    if (this.totalSteps <= 1) {
      return 100;
    }
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  /**
   * Check if a step is completed
   */
  isStepCompleted(stepIndex: number): boolean {
    return stepIndex + 1 < this.currentStep;
  }

  /**
   * Check if a step is currently active
   */
  isStepActive(stepIndex: number): boolean {
    return stepIndex + 1 === this.currentStep;
  }

  /**
   * Get step status for styling
   */
  getStepStatus(stepIndex: number): 'completed' | 'active' | 'upcoming' {
    const stepNumber = stepIndex + 1;
    if (stepNumber < this.currentStep) {
      return 'completed';
    } else if (stepNumber === this.currentStep) {
      return 'active';
    } else {
      return 'upcoming';
    }
  }

  /**
   * Get progress text for accessibility
   */
  getProgressText(): string {
    return `Step ${this.currentStep} of ${this.totalSteps}`;
  }

  /**
   * Get step label by index
   */
  getStepLabel(index: number): string {
    return this.steps[index] || `Step ${index + 1}`;
  }
}
