import {Component, Input} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.css'],
  animations: [
    trigger('listItemAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-20px)'}),
        animate('0.3s ease-out', style({opacity: 1, transform: 'translateX(0)'}))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateX(-20px)'}),
          stagger(500, [
            animate('0.3s ease-out', style({opacity: 1, transform: 'translateX(0)'}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class InstructionsListComponent {
  @Input() instructions: string[] = [];
  @Input() title: string = 'Instructions';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.instructions = data['instructions'];
      this.title = data['title'];
    });
  }
}
