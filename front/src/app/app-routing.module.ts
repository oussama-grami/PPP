import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {CommonModule} from "@angular/common";
import {EnergieComponent} from "./Components/energie/energie.component";
import {CarburantComponent} from "./Components/carburant/carburant.component";
import {AeriensComponent} from "./Components/aeriens/aeriens.component";
import {FretComponent} from "./Components/fret/fret.component";
import {ConsommablesComponent} from "./Components/consommables/consommables.component";
import {ImmobilisationsComponent} from "./Components/immobilisations/immobilisations.component";
import {PorteurComponent} from "./Components/porteur/porteur.component";
import {PanneauxComponent} from "./Components/panneaux/panneaux.component";
import {ResultatCarboneComponent} from "./Components/resultat-carbone/resultat-carbone.component";
import {EsgComponent} from './Components/esg/esg.component';
import {CarboneComponent} from "./Components/carbone/carbone.component";
import {ResultESGComponent} from "./Components/result-esg/result-esg.component";
import {ArboricultureComponent} from "./Components/arboriculture/arboriculture.component";
import {PisteComponent} from "./Components/piste/piste.component";
import {MarketplaceComponent} from './Components/marketplace/marketplace.component';
import {ProjectDetailsComponent} from './Components/project-details/project-details.component';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {PaymentComponent} from './Components/payment/payment.component';
import {ProjectOwnerComponent} from './Components/project-owner/project-owner.component';
import {ResourcesComponent} from './Components/resources/resources.component';
import {InfoComponent} from './Components/info/info.component';
import {MarketplaceBlogComponent} from './Components/marketplace-blog/marketplace-blog.component';
import {CarbonOffsetBlogComponent} from './Components/carbon-offset-blog/carbon-offset-blog.component';
import {CarbonCoBenifitsBlogComponent} from './Components/carbon-co-benifits-blog/carbon-co-benifits-blog.component';
import {RoadmapComponent} from './Components/roadmap/roadmap.component';
import {EsgAssessmentComponent} from './Components/esg-assessment/esg-assessment.component';
import {CarbonPredictionInfoComponent} from './Components/CarbonPredictionInfo/CarbonPredictionInfo.component';
import { HistoricalCarbonForecastComponent } from './Components/HistoricalCarbonForecast/HistoricalCarbonForecast.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'porteur', component: PorteurComponent},
  {path: 'energie', component: EnergieComponent},
  {path: 'car', component: CarburantComponent},
  {path: 'aer', component: AeriensComponent},
  {path: 'fret', component: FretComponent},
  {path: 'cons', component: ConsommablesComponent},
  {path: 'imob', component: ImmobilisationsComponent},
  {path: 'pan', component: PanneauxComponent},
  {path: 'resultat', component: ResultatCarboneComponent},
  {path: 'esg', component: EsgComponent},
  {path: 'carbone', component: CarboneComponent},
  {path: 'esg-result', component: ResultESGComponent},
  {path: 'arb', component: ArboricultureComponent},
  {path: 'piste', component: PisteComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'details/:id', component: ProjectDetailsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'new-project', component: ProjectOwnerComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'info', component: InfoComponent},
  {path: 'marketplace-blog', component: MarketplaceBlogComponent},
  {path: 'carbon-offset-blog', component: CarbonOffsetBlogComponent},
  {path: 'carbon-co-benefits-blog', component: CarbonCoBenifitsBlogComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'esg-assessment/:questionId', component: EsgAssessmentComponent},
  {path:'prediction-info', component: CarbonPredictionInfoComponent},
  {path:'historical-carbon-forecast', component: HistoricalCarbonForecastComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
