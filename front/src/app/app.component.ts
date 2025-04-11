import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ThemeService } from './Service/theme.service';
import { LoadingService } from './Service/loading.service';
import { RouteAnimationService } from './Service/route-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RouteAnimationService.fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'green_tech';
  currentRoute: string = '';
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public themeService: ThemeService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    // Track current route for animation purposes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['animation'] || 'fade';
        })
      )
      .subscribe((animationData) => {
        this.currentRoute = animationData;
      });

    // Subscribe to loading state
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  // Function to prepare route transitions
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  // Function to scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
