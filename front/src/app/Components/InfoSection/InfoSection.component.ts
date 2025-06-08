import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-InfoSection',
  templateUrl: './InfoSection.component.html',
  styleUrls: ['./InfoSection.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerFadeIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '0.5s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class InfoSectionComponent implements OnInit {
  @Input() title: string = '';
  @Input() paragraphs: string[] = [];
  @Input() image: string = '';
  @Input() imageAlt: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string | any[] = '';
  constructor(private router: Router) {}

  ngOnInit() {}
  navigateToLink() {
    if (Array.isArray(this.buttonLink)) {
      this.router.navigate(this.buttonLink);
    } else {
      this.router.navigate([this.buttonLink]);
    }
  }
}
