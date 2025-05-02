import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request should be excluded from token injection
    if (this.isUrlExcluded(request.url)) {
      return next.handle(request);
    }

    // Get token as Observable
    return from(this.keycloakService.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          // Clone the request and add the token
          const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(authReq);
        }
        // No token, proceed with original request
        return next.handle(request);
      })
    );
  }

  private isUrlExcluded(url: string): boolean {
    // Exclude assets and other non-API URLs from token injection
    const excludedPaths = ['/assets/', '/clients/public/'];
    return excludedPaths.some((path) => url.includes(path));
  }
}
