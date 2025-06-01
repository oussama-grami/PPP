import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum} from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-register-company-owner',
  templateUrl: './register-company-owner.component.html',
  styleUrls: ['./register-company-owner.component.css']
})
export class RegisterCompanyOwnerComponent {

  constructor(private router: Router) {}

  navigateToCompanyForm(): void {
    this.router.navigate([RoutesEnum.COMPANY_OWNER_FORM]);
  }
}
