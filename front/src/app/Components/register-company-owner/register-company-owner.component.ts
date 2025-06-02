import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../enumerations/Routes.enum';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'app-register-company-owner',
  templateUrl: './register-company-owner.component.html',
  styleUrls: ['./register-company-owner.component.css']
})
export class RegisterCompanyOwnerComponent implements OnInit {
  originalUrl: string = '/';

  constructor(
    private router: Router,
    private redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    // Récupérer l'URL d'origine stockée par le RedirectGuard
    this.originalUrl = this.redirectService.getOriginalUrl();
    console.log('URL d\'origine:', this.originalUrl);
  }

  navigateToCompanyForm(): void {
    this.router.navigate([RoutesEnum.COMPANY_OWNER_FORM]);
  }

  /**
   * Méthode appelée après que l'utilisateur a complété le processus d'enregistrement
   */
  completeRegistration(): void {
    // Effacer l'URL stockée
    this.redirectService.clearOriginalUrl();
    // Rediriger vers l'URL d'origine
    this.router.navigateByUrl(this.originalUrl);
  }
}
