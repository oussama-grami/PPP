import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public kcService: KeycloakService
  ) {
    setInterval(() => {
      console.log('AuthService is running every 5 seconds ' + kcService.isTokenExpired());
    },5000)
  }
}
