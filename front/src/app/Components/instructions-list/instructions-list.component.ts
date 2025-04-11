import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.css'],
  animations: [
    trigger('listItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.4s cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger(100, [
            animate('0.4s cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class InstructionsListComponent implements OnInit {
  @Input() instructions: string[] = [];
  @Input() title: string = 'Instructions';
  
  // Listen for system theme changes
  @HostBinding('class.dark-theme') isDarkTheme: boolean = false;

  constructor(private route: ActivatedRoute) {
    // Check for system dark mode preference
    this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Listen for changes to color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        this.isDarkTheme = e.matches;
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data && data['instructions']) {
        this.instructions = data['instructions'];
      }
      if (data && data['title']) {
        this.title = data['title'];
      }
    });
  }
}
