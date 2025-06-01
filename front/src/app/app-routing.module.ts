import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {CommonModule} from '@angular/common';
import {EnergieComponent} from './Components/energie/energie.component';
import {CarburantComponent} from './Components/carburant/carburant.component';
import {AeriensComponent} from './Components/aeriens/aeriens.component';
import {FretComponent} from './Components/fret/fret.component';
import {ConsommablesComponent} from './Components/consommables/consommables.component';
import {
  ImmobilisationsComponent
} from './Components/immobilisations/immobilisations.component';
import {PorteurComponent} from './Components/porteur/porteur.component';
import {PanneauxComponent} from './Components/panneaux/panneaux.component';
import {
  ResultatCarboneComponent
} from './Components/resultat-carbone/resultat-carbone.component';
import {EsgComponent} from './Components/esg/esg.component';
import {CarboneComponent} from './Components/carbone/carbone.component';
import {ResultESGComponent} from './Components/result-esg/result-esg.component';
import {ArboricultureComponent} from './Components/arboriculture/arboriculture.component';
import {PisteComponent} from './Components/piste/piste.component';
import {MarketplaceComponent} from './Components/marketplace/marketplace.component';
import {
  ProjectDetailsComponent
} from './Components/project-details/project-details.component';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {PaymentComponent} from './Components/payment/payment.component';
import {ProjectOwnerComponent} from './Components/project-owner/project-owner.component';
import {ResourcesComponent} from './Components/resources/resources.component';
import {InfoComponent} from './Components/info/info.component';
import {
  MarketplaceBlogComponent
} from './Components/marketplace-blog/marketplace-blog.component';
import {
  CarbonOffsetBlogComponent
} from './Components/carbon-offset-blog/carbon-offset-blog.component';
import {
  CarbonCoBenifitsBlogComponent
} from './Components/carbon-co-benifits-blog/carbon-co-benifits-blog.component';
import {RoadmapComponent} from './Components/roadmap/roadmap.component';
import {
  EsgAssessmentComponent
} from './Components/esg-assessment/esg-assessment.component';
import {
  CarbonPredictionInfoComponent
} from './Components/CarbonPredictionInfo/CarbonPredictionInfo.component';
import {
  HistoricalCarbonForecastComponent
} from './Components/HistoricalCarbonForecast/HistoricalCarbonForecast.component';
import {TransactionsComponent} from "./Components/transactions/transactions.component";
import {
  InstructionsListComponent
} from "./Components/instructions-list/instructions-list.component";
import {RoutesEnum} from "./enumerations/Routes.enum";
import {EventFormComponent} from "./Components/event-form/event-form.component";
import {
  EventFootprintComponent
} from "./Components/event-footprint/event-footprint.component";
import {EventResultComponent} from "./Components/event-result/event-result.component";
import {
  PaymentConfirmationComponent
} from "./Components/payment-confirmation/payment-confirmation.component";
import {EventHistoryComponent} from "./Components/event-history/event-history.component";
import {
  CarbonHistoryComponent
} from "./Components/carbon-history/carbon-history.component";

import {EsgHistoryComponent} from './Components/esg-history/esg-history.component';
import {CompanyOwnerFormComponent} from "./Components/company-owner-form/company-owner-form.component";
import {RegisterCompanyOwnerComponent} from "./Components/register-company-owner/register-company-owner.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: RoutesEnum.PORTEUR, component: PorteurComponent},
  {path: RoutesEnum.ENERGIE, component: EnergieComponent},
  {path: RoutesEnum.CARBURANT, component: CarburantComponent},
  {path: RoutesEnum.AERIENS, component: AeriensComponent},
  {path: RoutesEnum.FRET, component: FretComponent},
  {path: RoutesEnum.CONSOMMABLES, component: ConsommablesComponent},
  {path: RoutesEnum.IMMOBILISATIONS, component: ImmobilisationsComponent},
  {path: RoutesEnum.PANNEAUX, component: PanneauxComponent},
  {path: `${RoutesEnum.RESULTAT_CARBONE}/:id`, component: ResultatCarboneComponent},
  {path: 'esg', component: EsgComponent},
  {path: RoutesEnum.CARBONE, component: CarboneComponent},
  {path: 'esg-result', component: ResultESGComponent},
  {path: RoutesEnum.ARBORICULTURE, component: ArboricultureComponent},
  /*{path: 'piste', component: PisteComponent},*/
  {path: RoutesEnum.MARKETPLACE, component: MarketplaceComponent},
  {path: RoutesEnum.PROJECT_DETAILS + '/:id', component: ProjectDetailsComponent},
  {path: RoutesEnum.CHECKOUT, component: CheckoutComponent},
  {path: RoutesEnum.PAYMENT, component: PaymentComponent},
  {path: RoutesEnum.NEW_PROJECT, component: ProjectOwnerComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: RoutesEnum.INFO, component: InfoComponent},
  {path: RoutesEnum.MARKETPLACE_BLOG, component: MarketplaceBlogComponent},
  {path: RoutesEnum.CARBON_OFFSET_BLOG, component: CarbonOffsetBlogComponent},
  {path: RoutesEnum.CARBON_CO_BENEFITS_BLOG, component: CarbonCoBenifitsBlogComponent},
  {path: RoutesEnum.ROADMAP, component: RoadmapComponent},
  {path: 'esg-assessment/:questionId', component: EsgAssessmentComponent},
  {path: 'prediction-info', component: CarbonPredictionInfoComponent},
  {path: 'historical-carbon-forecast', component: HistoricalCarbonForecastComponent},
  {path: RoutesEnum.TRANSACTIONS, component: TransactionsComponent},
  {path: 'payment-confirmation', component: PaymentConfirmationComponent},
  {path: RoutesEnum.ESG_HISTORY, component: EsgHistoryComponent},
  {
    path: "test", component: InstructionsListComponent, data: {
      instructions: [
        'Connectez-vous à votre compte',
        'Remplissez le formulaire de demande',
        'Vérifiez les informations saisies',
        'Soumettez votre demande avant la date limite'
      ],
      title: 'Procédure de demande'
    }
  },
  {path: RoutesEnum.EVENT_FORM, component: EventFormComponent},
  {path: RoutesEnum.EVENT_FOOTPRINT, component: EventFootprintComponent},
  {path: `${RoutesEnum.EVENT_RESULT}/:id`, component: EventResultComponent},
  {path: RoutesEnum.EVENT_HISTORY, component: EventHistoryComponent},
  {path: RoutesEnum.CARBON_HISTORY, component: CarbonHistoryComponent},
  {path: RoutesEnum.EVENT_FORM, component: EventFormComponent},
  {path: RoutesEnum.EVENT_FOOTPRINT, component: EventFootprintComponent},
  {path: RoutesEnum.EVENT_RESULT, component: EventResultComponent},
  {path: RoutesEnum.COMPANY_OWNER_FORM, component: CompanyOwnerFormComponent},
  {path: RoutesEnum.REGISTER_COMPANY_OWNER, component: RegisterCompanyOwnerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
