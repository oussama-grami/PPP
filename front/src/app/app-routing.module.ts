import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CommonModule } from '@angular/common';
import { EnergieComponent } from './Components/energie/energie.component';
import { CarburantComponent } from './Components/carburant/carburant.component';
import { AeriensComponent } from './Components/aeriens/aeriens.component';
import { FretComponent } from './Components/fret/fret.component';
import { ConsommablesComponent } from './Components/consommables/consommables.component';
import { ImmobilisationsComponent } from './Components/immobilisations/immobilisations.component';
import { PorteurComponent } from './Components/porteur/porteur.component';
import { PanneauxComponent } from './Components/panneaux/panneaux.component';
import { ResultatCarboneComponent } from './Components/resultat-carbone/resultat-carbone.component';
import { EsgComponent } from './Components/esg/esg.component';
import { CarboneComponent } from './Components/carbone/carbone.component';
import { ResultESGComponent } from './Components/result-esg/result-esg.component';
import { ArboricultureComponent } from './Components/arboriculture/arboriculture.component';
import { PisteComponent } from './Components/piste/piste.component';
import { MarketplaceComponent } from './Components/marketplace/marketplace.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ProjectOwnerComponent } from './Components/project-owner/project-owner.component';
import { ResourcesComponent } from './Components/resources/resources.component';
import { InfoComponent } from './Components/info/info.component';
import { MarketplaceBlogComponent } from './Components/marketplace-blog/marketplace-blog.component';
import { CarbonOffsetBlogComponent } from './Components/carbon-offset-blog/carbon-offset-blog.component';
import { CarbonCoBenifitsBlogComponent } from './Components/carbon-co-benifits-blog/carbon-co-benifits-blog.component';
import { RoadmapComponent } from './Components/roadmap/roadmap.component';
import { EsgAssessmentComponent } from './Components/esg-assessment/esg-assessment.component';
import { CarbonPredictionInfoComponent } from './Components/CarbonPredictionInfo/CarbonPredictionInfo.component';
import { HistoricalCarbonForecastComponent } from './Components/HistoricalCarbonForecast/HistoricalCarbonForecast.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { InstructionsListComponent } from './Components/instructions-list/instructions-list.component';
import { RoutesEnum } from './enumerations/Routes.enum';
import { EventFormComponent } from './Components/event-form/event-form.component';
import { EventFootprintComponent } from './Components/event-footprint/event-footprint.component';
import { EventResultComponent } from './Components/event-result/event-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  {
    path: RoutesEnum.PORTEUR,
    component: PorteurComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.ENERGIE,
    component: EnergieComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.CARBURANT,
    component: CarburantComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.AERIENS,
    component: AeriensComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.FRET,
    component: FretComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.CONSOMMABLES,
    component: ConsommablesComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.IMMOBILISATIONS,
    component: ImmobilisationsComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.PANNEAUX,
    component: PanneauxComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.RESULTAT_CARBONE,
    component: ResultatCarboneComponent,
    data: { animation: 'page' },
  },
  { path: 'esg', component: EsgComponent, data: { animation: 'page' } },
  {
    path: RoutesEnum.CARBONE,
    component: CarboneComponent,
    data: { animation: 'page' },
  },
  {
    path: 'esg-result',
    component: ResultESGComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.ARBORICULTURE,
    component: ArboricultureComponent,
    data: { animation: 'page' },
  },
  { path: 'piste', component: PisteComponent, data: { animation: 'page' } },
  {
    path: RoutesEnum.MARKETPLACE,
    component: MarketplaceComponent,
    data: { animation: 'marketplace' },
  },
  {
    path: RoutesEnum.PROJECT_DETAILS + '/:id',
    component: ProjectDetailsComponent,
    data: { animation: 'detail' },
  },
  {
    path: RoutesEnum.CHECKOUT,
    component: CheckoutComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.PAYMENT,
    component: PaymentComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.NEW_PROJECT,
    component: ProjectOwnerComponent,
    data: { animation: 'page' },
  },
  {
    path: 'resources',
    component: ResourcesComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.INFO,
    component: InfoComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.MARKETPLACE_BLOG,
    component: MarketplaceBlogComponent,
    data: { animation: 'blog' },
  },
  {
    path: RoutesEnum.CARBON_OFFSET_BLOG,
    component: CarbonOffsetBlogComponent,
    data: { animation: 'blog' },
  },
  {
    path: RoutesEnum.CARBON_CO_BENEFITS_BLOG,
    component: CarbonCoBenifitsBlogComponent,
    data: { animation: 'blog' },
  },
  { path: 'roadmap', component: RoadmapComponent, data: { animation: 'page' } },
  {
    path: 'esg-assessment/:questionId',
    component: EsgAssessmentComponent,
    data: { animation: 'page' },
  },
  {
    path: 'prediction-info',
    component: CarbonPredictionInfoComponent,
    data: { animation: 'page' },
  },
  {
    path: 'historical-carbon-forecast',
    component: HistoricalCarbonForecastComponent,
    data: { animation: 'page' },
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { animation: 'page' },
  },
  {
    path: 'test',
    component: InstructionsListComponent,
    data: {
      instructions: [
        'Connectez-vous à votre compte',
        'Remplissez le formulaire de demande',
        'Vérifiez les informations saisies',
        'Soumettez votre demande avant la date limite',
      ],
      animation: 'page',
    },
  },
  {
    path: RoutesEnum.EVENT_FORM,
    component: EventFormComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.EVENT_FOOTPRINT,
    component: EventFootprintComponent,
    data: { animation: 'page' },
  },
  {
    path: RoutesEnum.EVENT_RESULT,
    component: EventResultComponent,
    data: { animation: 'page' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
