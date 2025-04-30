import { Injectable } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(public kcService: KeycloakService) {
    // Check initial authentication status
    this.updateAuthState();
    this.kcService.keycloakEvents$.subscribe((e) => {
      if (e.type == KeycloakEventType.OnTokenExpired) {
        this.kcService.updateToken().then(() => {
          this.updateAuthState();
        });
      }
    });
  }

  private updateAuthState(): void {
    this.kcService
      .isLoggedIn()
      .then((authenticated) => {
        this.isAuthenticated.next(authenticated);
      })
      .catch((err) => {
        console.error('Error checking authentication status', err);
        this.isAuthenticated.next(false);
      });
  }

  public getAuthenticationState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  public async login(): Promise<void> {
    return this.kcService.login();
  }

  public async logout(): Promise<void> {
    return this.kcService.logout(window.location.origin);
  }

  public getUsername(): string {
    try {
      const userDetails = this.kcService.getKeycloakInstance().idTokenParsed;
      return userDetails ? userDetails['preferred_username'] || '' : '';
    } catch (e) {
      console.error('Error getting username', e);
      return '';
    }
  }

  public getRoles(): string[] {
    try {
      return this.kcService.getUserRoles();
    } catch (e) {
      console.error('Error getting roles', e);
      return [];
    }
  }

  public hasRole(role: string): boolean {
    try {
      return this.kcService.isUserInRole(role);
    } catch (e) {
      console.error(`Error checking role ${role}`, e);
      return false;
    }
  }
}
