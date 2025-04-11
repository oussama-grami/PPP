import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ThemeService } from '../../Service/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  // Add the '!' operator to tell TypeScript that this property will be assigned a value
  // even though it's not initialized in the constructor
  @ViewChild('footerContent') footerContent!: ElementRef;

  constructor(public themeService: ThemeService) { }

  ngAfterViewInit() {
    this.setupFooterReveal();
  }

  setupFooterReveal() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });
      
      if (this.footerContent?.nativeElement) {
        observer.observe(this.footerContent.nativeElement);
      }
    }
  }
}
