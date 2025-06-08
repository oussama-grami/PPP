import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
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
            stagger(200, [
              animate(
                '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('heroAnimation', [
      transition(':enter', [
        animate(
          '1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          keyframes([
            style({
              opacity: 0,
              transform: 'translateY(50px) scale(0.95)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'translateY(25px) scale(0.98)',
              offset: 0.5,
            }),
            style({
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate(
          '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;

  protected readonly RoutesEnum = RoutesEnum;
  private observer!: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Scroll to top on component initialization
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initScrollAnimations();
      this.initParallaxEffect();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initScrollAnimations(): void {
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .slide-in-left, .slide-in-right'
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered delay for multiple elements
            const siblings = Array.from(
              entry.target.parentElement?.children || []
            );
            const index = siblings.indexOf(entry.target);
            (entry.target as HTMLElement).style.transitionDelay = `${
              index * 100
            }ms`;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  private initParallaxEffect(): void {
    if (!this.isBrowser) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      const bannerElements = document.querySelectorAll('.banner-container');
      const accentCircles = document.querySelectorAll('.accent-circle');

      bannerElements.forEach((element) => {
        const speed = 0.5;
        (element as HTMLElement).style.transform = `translateY(${
          scrollY * speed
        }px)`;
      });

      accentCircles.forEach((circle, index) => {
        const speed = 0.2 + index * 0.1;
        (circle as HTMLElement).style.transform = `translateY(${
          scrollY * speed
        }px) rotate(${scrollY * 0.1}deg)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Enhanced navigation methods with smooth transitions
  navigateToESG(): void {
    this.smoothNavigate(`/${RoutesEnum.ESG}`);
  }

  navigateToCarbon(): void {
    this.smoothNavigate(`/${RoutesEnum.CARBONE}`);
  }

  navigateToPorteur(): void {
    this.smoothNavigate(`/${RoutesEnum.PORTEUR}`);
  }

  navigateToMarketplace(): void {
    this.smoothNavigate(`/${RoutesEnum.MARKETPLACE}`);
  }

  private smoothNavigate(route: string): void {
    // Add a subtle transition effect before navigation
    document.body.style.opacity = '0.9';

    setTimeout(() => {
      this.router.navigate([route]).then(() => {
        document.body.style.opacity = '1';
      });
    }, 150);
  }

  // Method to handle button interactions with enhanced feedback
  onButtonClick(event: Event, action: () => void): void {
    const button = event.currentTarget as HTMLElement;

    // Add ripple effect
    this.createRippleEffect(event, button);

    // Execute action after animation
    setTimeout(() => {
      action();
    }, 200);
  }

  private createRippleEffect(event: Event, element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const mouseEvent = event as MouseEvent;
    const x = mouseEvent.clientX - rect.left;
    const y = mouseEvent.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      width: 20px;
      height: 20px;
      left: ${x - 10}px;
      top: ${y - 10}px;
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    // Add ripple keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(20);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}
