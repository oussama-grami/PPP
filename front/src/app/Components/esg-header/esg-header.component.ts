import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-esg-header',
  templateUrl: './esg-header.component.html',
  styleUrls: ['./esg-header.component.css'],
})
export class EsgHeaderComponent {
  @Input() currentQuestion: number = 1;

  // Helper function to generate number ranges
  getRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
