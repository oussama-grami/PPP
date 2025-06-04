import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {RoutesEnum} from '../../enumerations/Routes.enum';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-nav-acceuil',
  templateUrl: './nav-acceuil.component.html',
  styleUrls: ['./nav-acceuil.component.css'],
})
export class NavAcceuilComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  isScrolled = false;
  activeDropdown: string | null = null;
  routes = RoutesEnum; // Expose routes to template
  isAuthenticated = false;
  username = '';
  userRoles: string[] = [];

  private routerSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;

  constructor(
    public router: Router,
    private authService: AuthService,
    private keycloakService: KeycloakService
  ) {
  }

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScrollPosition();

    // Listen for scroll events
    window.addEventListener('scroll', this.onScroll);

    // Close menu on navigation
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.mobileMenuOpen = false;
        this.activeDropdown = null;
        document.body.classList.remove('no-scroll');
      });

    // Subscribe to authentication state changes
    this.authSubscription = this.authService
      .getAuthenticationState()
      .subscribe((authenticated: boolean) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.loadUserInfo();
        } else {
          this.username = '';
          this.userRoles = [];
        }
      });

    // Initial authentication check
    this.checkAuthenticationStatus();
  }

  private async checkAuthenticationStatus(): Promise<void> {
    try {
      this.isAuthenticated = await this.keycloakService.isLoggedIn();
      if (this.isAuthenticated) {
        this.loadUserInfo();
      }
    } catch (error: unknown) {
      console.error('Error checking authentication status:', error);
      this.isAuthenticated = false;
    }
  }

  private loadUserInfo(): void {
    try {
      this.username = this.authService.getUsername();
      this.userRoles = this.authService.getRoles();
    } catch (error: unknown) {
      console.error('Error loading user info:', error);
    }
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    window.removeEventListener('scroll', this.onScroll);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    // Ensure no-scroll is removed when component is destroyed
    document.body.classList.remove('no-scroll');
  }

  @HostListener('window:resize')
  onResize(): void {
    // Close mobile menu on window resize (especially when switching to desktop)
    if (window.innerWidth >= 1040 && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
      document.body.classList.remove('no-scroll');
    }
  }

  onScroll = (): void => {
    this.isScrolled = window.scrollY > 10;
  };

  checkScrollPosition(): void {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    // Toggle body scroll lock
    if (this.mobileMenuOpen) {
      document.body.classList.add('no-scroll');
      this.activeDropdown = null; // Close any open dropdowns
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  toggleDropdown(dropdown: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Handle dropdown toggle logic
    const isOpening = this.activeDropdown !== dropdown;

    // On mobile, close any previously open dropdown before opening a new one
    if (window.innerWidth <= 1040) {
      // First close existing dropdown if there is one
      if (this.activeDropdown !== null && isOpening) {
        this.activeDropdown = null;

        // Small delay to allow animation to complete before opening new dropdown
        setTimeout(() => {
          this.activeDropdown = dropdown;
          // Position the dropdown after it's opened
          this.positionDropdownNextToParent(
            event?.currentTarget as HTMLElement,
            dropdown
          );
        }, 10);
      } else {
        // Toggle current dropdown
        this.activeDropdown = isOpening ? dropdown : null;

        // Position the dropdown if we're opening it
        if (isOpening && event) {
          // Small delay to ensure the dropdown is in the DOM
          setTimeout(() => {
            this.positionDropdownNextToParent(
              event.currentTarget as HTMLElement,
              dropdown
            );
          }, 10);
        }
      }
    } else {
      // Desktop behavior
      this.activeDropdown = isOpening ? dropdown : null;
    }
  }

  /**
   * Position a dropdown menu next to its parent nav item
   */
  private positionDropdownNextToParent(
    navItem: HTMLElement | null,
    dropdownId: string
  ): void {
    if (!navItem) return;

    // Find the dropdown element that corresponds to this nav item
    let dropdownMenu: HTMLElement | null = null;

    if (navItem) {
      // First try to get the dropdown directly (for standard nav items)
      dropdownMenu = navItem.nextElementSibling as HTMLElement;

      // If not found or not a dropdown, try to find it by ID (for special cases)
      if (!dropdownMenu || !dropdownMenu.classList.contains('dropdown-menu')) {
        // Try to find the dropdown by a more specific selector
        const parentLi = navItem.closest('li') || navItem.closest('div');
        if (parentLi) {
          dropdownMenu = parentLi.querySelector(
            '.dropdown-menu'
          ) as HTMLElement;
        }
      }
    }

    // If we found the dropdown, position it
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
      // Get positions
      const navRect = navItem.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Position the dropdown at the same vertical position as the nav item
      // but to its right side
      dropdownMenu.style.top = `${navRect.top}px`;

      // Calculate the best horizontal position
      // If there's enough space on the right, place it there
      // Otherwise, place it on the left
      if (navRect.right + 230 < viewportWidth) {
        // Place to the right with a small offset
        dropdownMenu.style.left = `${navRect.right + 5}px`;
        dropdownMenu.style.right = 'auto';
      } else {
        // Not enough space on right, place on left
        dropdownMenu.style.left = 'auto';
        dropdownMenu.style.right = `${viewportWidth - navRect.left + 5}px`;
      }

      // Ensure the dropdown doesn't go off the bottom of the screen
      const viewportHeight = window.innerHeight;
      const dropdownHeight = dropdownMenu.offsetHeight;

      if (navRect.top + dropdownHeight > viewportHeight) {
        dropdownMenu.style.top = `${Math.max(
          10,
          viewportHeight - dropdownHeight - 10
        )}px`;
      }
    }
  }

  // Handle click outside to close dropdown on mobile
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Only handle outside clicks when in mobile view
    if (window.innerWidth <= 1040 && this.activeDropdown) {
      const target = event.target as HTMLElement;
      // Check if the click is outside any dropdown
      if (!target.closest('.dropdown-menu') && !target.closest('.nav-link')) {
        this.activeDropdown = null;
      }
    }
  }

  isDropdownActive(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }

  isRouteActive(route: string): boolean {
    return this.router.url === '/' + route;
  }

  isRouteActivePartial(routes: string[]): boolean {
    return routes.some((route) => this.router.url == '/' + route);
  }

  logout(): void {
    this.authService
      .logout()
      .then(() => {
        console.log('Successfully logged out');
      })
      .catch((error: unknown) => {
        console.error('Error during logout:', error);
      });
  }

  login(): void {
    this.authService
      .login()
      .then(() => {
        console.log('Successfully logged in');
      })
      .catch((error: unknown) => {
        console.error('Error during login:', error);
      });
  }

  protected readonly RoutesEnum = RoutesEnum;
}
