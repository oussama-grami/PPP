import { Injectable } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RouteAnimationService {
  // Fade animation
  static fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [
      query(':enter', 
        [
          style({ opacity: 0 })
        ], 
        { optional: true }
      ),
      query(':leave', 
        [
          style({ opacity: 1 }),
          animate('0.3s', style({ opacity: 0 }))
        ], 
        { optional: true }
      ),
      query(':enter', 
        [
          style({ opacity: 0 }),
          animate('0.3s', style({ opacity: 1 }))
        ], 
        { optional: true }
      )
    ])
  ]);

  // Slide animation
  static slideAnimation = trigger('slideAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true })
      ])
    ])
  ]);

  constructor() { }
}