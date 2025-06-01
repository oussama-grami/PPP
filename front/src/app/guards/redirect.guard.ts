import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RedirectService } from '../services/redirect.service';
import { RoutesEnum } from '../enumerations/Routes.enum';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private redirectService: RedirectService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Stocker l'URL d'origine
    const originalUrl = state.url;
    this.redirectService.setOriginalUrl(originalUrl);
    
    // Vérifier l'autorisation avec le backend
    return this.redirectService.checkAuthorization().pipe(
      map(isAuthorized => {
        if (isAuthorized) {
          // Si autorisé, permettre l'accès à la route
          return true;
        } else {
          // Si non autorisé, rediriger vers la page RegisterCompanyOwner
          return this.router.createUrlTree([RoutesEnum.REGISTER_COMPANY_OWNER]);
        }
      }),
      tap(result => {
        if (result === true) {
          console.log('Accès autorisé à:', originalUrl);
        } else {
          console.log('Redirection vers le formulaire d\'enregistrement depuis:', originalUrl);
        }
      })
    );
  }
}