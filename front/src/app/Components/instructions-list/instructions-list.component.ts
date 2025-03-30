import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.css'],
  animations: [
    trigger('listItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class InstructionsListComponent {
  @Input() instructions: string[] = [];
  @Input() title: string = 'Instructions';
}
