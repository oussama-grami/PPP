import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './Components/home/home.component';
import {EnergieComponent} from './Components/energie/energie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarburantComponent} from './Components/carburant/carburant.component';
import {AeriensComponent} from './Components/aeriens/aeriens.component';
import {FretComponent} from './Components/fret/fret.component';
import {ConsommablesComponent} from './Components/consommables/consommables.component';
import {ImmobilisationsComponent} from './Components/immobilisations/immobilisations.component';
import {PorteurComponent} from './Components/porteur/porteur.component';
import {PanneauxComponent} from './Components/panneaux/panneaux.component';
import {ResultatCarboneComponent} from './Components/resultat-carbone/resultat-carbone.component';
import {EsgComponent} from './Components/esg/esg.component';
import {CarboneComponent} from './Components/carbone/carbone.component';
import {CarboneDiagramComponent} from './Components/carbone-diagram/carbone-diagram.component';
import {ResultESGComponent} from './Components/result-esg/result-esg.component';
import {NavAcceuilComponent} from './Components/nav-acceuil/nav-acceuil.component';
import {ESGdiagramComponent} from './Components/esgdiagram/esgdiagram.component';
import {ArboricultureComponent} from './Components/arboriculture/arboriculture.component';
import {HttpClientModule} from "@angular/common/http";
import {PisteComponent} from './Components/piste/piste.component';
import {MarketplaceComponent} from './Components/marketplace/marketplace.component';
import {FilterItemComponent} from './Components/filter-item/filter-item.component';
import {ProjectAdComponent} from './Components/project-ad/project-ad.component';
import {CommonModule} from '@angular/common';
import {ProjectDetailsComponent} from './Components/project-details/project-details.component';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {FooterComponent} from './Components/footer/footer.component';
import {PaymentComponent} from './Components/payment/payment.component';
import {ProjectOwnerComponent} from './Components/project-owner/project-owner.component';
import {ResourcesComponent} from './Components/resources/resources.component';
import {InfoComponent} from './Components/info/info.component';
import {MarketplaceBlogComponent} from './Components/marketplace-blog/marketplace-blog.component';
import {CarbonOffsetBlogComponent} from './Components/carbon-offset-blog/carbon-offset-blog.component';
import {CarbonCoBenifitsBlogComponent} from './Components/carbon-co-benifits-blog/carbon-co-benifits-blog.component';
import {RoadmapComponent} from './Components/roadmap/roadmap.component';
import {EsgHeaderComponent} from './Components/esg-header/esg-header.component';
import {EsgAssessmentComponent} from './Components/esg-assessment/esg-assessment.component';
import {PaginationComponent} from './Components/pagination/pagination.component';
import {PriceDetailsComponent} from './Components/price-details/price-details.component';
import {EsgOverviewComponent} from './Components/esg-overview/esg-overview.component';
import {ProjectsCarouselComponent} from "./Components/projects-carousel/projects-carousel.component";
import { InfoSectionComponent } from './Components/InfoSection/InfoSection.component';
import { CarbonPredictionInfoComponent } from './Components/CarbonPredictionInfo/CarbonPredictionInfo.component';
import{ HistoricalCarbonForecastComponent } from './Components/HistoricalCarbonForecast/HistoricalCarbonForecast.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import {InstructionsListComponent} from "./Components/instructions-list/instructions-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EventFormComponent } from './Components/event-form/event-form.component';
import { EventFootprintComponent } from './Components/event-footprint/event-footprint.component';
import { EventResultComponent } from './Components/event-result/event-result.component';
import { PaymentConfirmationComponent } from './Components/payment-confirmation/payment-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnergieComponent,
    CarburantComponent,
    AeriensComponent,
    FretComponent,
    ConsommablesComponent,
    ImmobilisationsComponent,
    PorteurComponent,
    EsgHeaderComponent,
    EsgAssessmentComponent,
    PanneauxComponent,
    ResultatCarboneComponent,
    EsgComponent,
    CarboneComponent,
    CarboneDiagramComponent,
    ResultESGComponent,
    NavAcceuilComponent,
    ESGdiagramComponent,
    ArboricultureComponent,
    PisteComponent,
    MarketplaceComponent,
    FilterItemComponent,
    ProjectAdComponent,
    ProjectDetailsComponent,
    CheckoutComponent,
    FooterComponent,
    PaymentComponent,
    ProjectOwnerComponent,
    ResourcesComponent,
    InfoComponent,
    MarketplaceBlogComponent,
    CarbonOffsetBlogComponent,
    CarbonCoBenifitsBlogComponent,
    RoadmapComponent,
    PaginationComponent,
    PriceDetailsComponent,
    EsgOverviewComponent,
    ProjectsCarouselComponent,
    InfoSectionComponent,
    CarbonPredictionInfoComponent,
    HistoricalCarbonForecastComponent,
    TransactionsComponent,
    InstructionsListComponent,
    EventFormComponent,
    EventFootprintComponent,
    EventResultComponent,
    PaymentConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
