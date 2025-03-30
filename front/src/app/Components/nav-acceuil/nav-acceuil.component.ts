import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enumerations/Routes.enum";

;

@Component({
  selector: 'app-nav-acceuil',
  templateUrl: './nav-acceuil.component.html',
  styleUrls: ['./nav-acceuil.component.css']
})
export class NavAcceuilComponent {
  constructor(private router: Router) {
  }

  list_0: string[] = [
    RoutesEnum.HOME
  ]

  list_1: string[] = [
    RoutesEnum.CARBONE,
    RoutesEnum.PORTEUR,
    RoutesEnum.ESG,
    RoutesEnum.AERIENS,
    RoutesEnum.ARBORICULTURE,
    RoutesEnum.CARBURANT,
    RoutesEnum.CONSOMMABLES,
    RoutesEnum.ENERGIE,
    RoutesEnum.ESG_ASSESSMENT,
    RoutesEnum.FRET,
    RoutesEnum.PISTE,
    RoutesEnum.RESULT_ESG,
    RoutesEnum.RESULTAT_CARBONE,
    RoutesEnum.ROADMAP,
    RoutesEnum.INFO,
    RoutesEnum.IMMOBILISATIONS
  ]

  list_4: string[] = [
    RoutesEnum.RESOURCES,
    RoutesEnum.CARBON_CO_BENEFITS_BLOG,
    RoutesEnum.CARBON_OFFSET_BLOG,
    RoutesEnum.MARKETPLACE_BLOG
  ]

  list_5: string[] = [
    RoutesEnum.MARKETPLACE,
    RoutesEnum.PANNEAUX,
    RoutesEnum.PAYMENT,
    RoutesEnum.PROJECT_DETAILS,
    RoutesEnum.NEW_PROJECT
  ]

  list_6: string[] = [
    RoutesEnum.CHECKOUT
  ]

  isRoute0Active(): boolean {
    return this.list_0.some((route) => this.router.url === "/" + route);
  }

  isRoute1Active(): boolean {
    return this.list_1.some((route) => this.router.url === "/" + route);
  }

  isRoute4Active(): boolean {
    return this.list_4.some((route) => this.router.url === "/" + route);
  }

  isRoute5Active(): boolean {
    return this.list_5.some((route) => this.router.url === "/" + route);
  }

  isRoute6Active(): boolean {
    return this.list_6.some((route) => this.router.url === "/" + route);
  }
}
