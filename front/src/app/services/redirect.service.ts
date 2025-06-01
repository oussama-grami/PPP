import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private originalUrl: string = '/';

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Stocke l'URL d'origine pour une redirection ultérieure
   */
  setOriginalUrl(url: string): void {
    this.originalUrl = url;
    // Stocker également dans le localStorage pour persister entre les rechargements de page
    localStorage.setItem('redirectOriginalUrl', url);
  }

  /**
   * Récupère l'URL d'origine stockée
   */
  getOriginalUrl(): string {
    // Vérifier d'abord dans le localStorage
    const storedUrl = localStorage.getItem('redirectOriginalUrl');
    return storedUrl || this.originalUrl;
  }

  /**
   * Efface l'URL d'origine après redirection réussie
   */
  clearOriginalUrl(): void {
    this.originalUrl = '/';
    localStorage.removeItem('redirectOriginalUrl');
  }

  /**
   * Vérifie l'autorisation auprès du backend
   * @returns Observable<boolean> - true si autorisé, false sinon
   */
  checkAuthorization(): Observable<boolean> {
    // Appel API au backend pour vérifier l'autorisation
    return this.http.get<boolean>(`${environment.apiUrl}/api/company-owners`);

    // Pour les tests, vous pouvez utiliser cette ligne à la place:
    // return of(false); // Simuler une non-autorisation pour tester la redirection
  }

  completeRegistration() {
    this.router.navigateByUrl(this.getOriginalUrl());
    this.clearOriginalUrl();
  }
}
