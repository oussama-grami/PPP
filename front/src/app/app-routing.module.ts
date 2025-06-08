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
import {
  CompanyOwnerFormComponent
} from "./Components/company-owner-form/company-owner-form.component";
import {
  RegisterCompanyOwnerComponent
} from "./Components/register-company-owner/register-company-owner.component";
import {AuthGuard} from "./auth.guard";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {RedirectGuard} from "./guards/redirect.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: RoutesEnum.PORTEUR, component: PorteurComponent},
  {
    path: RoutesEnum.ENERGIE,
    component: EnergieComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.CARBURANT,
    component: CarburantComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.AERIENS,
    component: AeriensComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.FRET,
    component: FretComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.CONSOMMABLES,
    component: ConsommablesComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.IMMOBILISATIONS,
    component: ImmobilisationsComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.PANNEAUX, component: PanneauxComponent, canActivate: [AuthGuard]},
  {
    path: `${RoutesEnum.RESULTAT_CARBONE}/:id`,
    component: ResultatCarboneComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.ESG, component: EsgComponent},
  {
    path: RoutesEnum.CARBONE,
    component: CarboneComponent
  },
  {
    path: RoutesEnum.RESULT_ESG,
    component: ResultESGComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.ARBORICULTURE,
    component: ArboricultureComponent,
    canActivate: [AuthGuard]
  },
  /*{path: 'piste', component: PisteComponent},*/
  {
    path: RoutesEnum.MARKETPLACE,
    component: MarketplaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutesEnum.PROJECT_DETAILS + '/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.CHECKOUT,
    component: CheckoutComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.PAYMENT,
    component: PaymentComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.NEW_PROJECT,
    component: ProjectOwnerComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.RESOURCES, component: ResourcesComponent},
  {
    path: RoutesEnum.INFO,
    component: InfoComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.MARKETPLACE_BLOG, component: MarketplaceBlogComponent},
  {path: RoutesEnum.CARBON_OFFSET_BLOG, component: CarbonOffsetBlogComponent},
  {path: RoutesEnum.CARBON_CO_BENEFITS_BLOG, component: CarbonCoBenifitsBlogComponent},
  {
    path: RoutesEnum.ROADMAP,
    component: RoadmapComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.ESG_ASSESSMENT + '/:questionId?',
    component: EsgAssessmentComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.PREDICTION_INFO, component: CarbonPredictionInfoComponent},
  {
    path: RoutesEnum.HISTORICAL_CARBON_FORECAST,
    component: HistoricalCarbonForecastComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {path: RoutesEnum.TRANSACTIONS, component: TransactionsComponent},
  {
    path: RoutesEnum.PaYMENT_CONFIRMATION,
    component: PaymentConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutesEnum.ESG_HISTORY,
    component: EsgHistoryComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  /*{
    path: "test", component: InstructionsListComponent, data: {
      instructions: [
        'Connectez-vous à votre compte',
        'Remplissez le formulaire de demande',
        'Vérifiez les informations saisies',
        'Soumettez votre demande avant la date limite'
      ],
      title: 'Procédure de demande'
    }
  },*/
  {
    path: RoutesEnum.EVENT_FORM,
    component: EventFormComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.EVENT_FOOTPRINT,
    component: EventFootprintComponent
  },
  {
    path: `${RoutesEnum.EVENT_RESULT}/:id`,
    component: EventResultComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.EVENT_HISTORY,
    component: EventHistoryComponent,
    canActivate: [RedirectGuard]
  },
  {
    path: RoutesEnum.CARBON_HISTORY,
    component: CarbonHistoryComponent,
    canActivate: [AuthGuard, RedirectGuard]
  },
  {
    path: RoutesEnum.COMPANY_OWNER_FORM,
    component: CompanyOwnerFormComponent,
    canActivate: [AuthGuard]
  },
  {path: RoutesEnum.REGISTER_COMPANY_OWNER, component: RegisterCompanyOwnerComponent},
  {path: "**", component: ErrorPageComponent}
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
