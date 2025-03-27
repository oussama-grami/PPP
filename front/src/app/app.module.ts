import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { EnergieComponent } from './Components/energie/energie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarburantComponent } from './Components/carburant/carburant.component';
import { AeriensComponent } from './Components/aeriens/aeriens.component';
import { FretComponent } from './Components/fret/fret.component';
import { ConsommablesComponent } from './Components/consommables/consommables.component';
import { ImmobilisationsComponent } from './Components/immobilisations/immobilisations.component';
import { PorteurComponent } from './Components/porteur/porteur.component';
import { ESGComponent } from './Components/esg/esg.component';
import { Environnement1Component } from './Components/environnement1/environnement1.component';
import { Environnement2Component } from './Components/environnement2/environnement2.component';
import { Environnement3Component } from './Components/environnement3/environnement3.component';
import { Environnement4Component } from './Components/environnement4/environnement4.component';
import { SocialComponent } from './Components/social/social.component';
import { Social1Component } from './Components/social1/social1.component';
import { Social2Component } from './Components/social2/social2.component';
import { Social3Component } from './Components/social3/social3.component';
import { Social4Component } from './Components/social4/social4.component';
import { GouvernanceComponent } from './Components/gouvernance/gouvernance.component';
import { Gouvernance1Component } from './Components/gouvernance1/gouvernance1.component';
import { Gouvernance2Component } from './Components/gouvernance2/gouvernance2.component';
import { Gouvernance3Component } from './Components/gouvernance3/gouvernance3.component';
import { Gouvernance4Component } from './Components/gouvernance4/gouvernance4.component';
import { PanneauxComponent } from './Components/panneaux/panneaux.component';
import { ResultatCarboneComponent } from './Components/resultat-carbone/resultat-carbone.component';
import { Esg1Component } from './Components/esg1/esg1.component';
import { CarboneComponent } from './Components/carbone/carbone.component';
import { CarboneDiagramComponent } from './Components/carbone-diagram/carbone-diagram.component';
import { ResultESGComponent } from './Components/result-esg/result-esg.component';
import { PropositionEnvironnementComponent } from './Components/proposition-environnement/proposition-environnement.component';
import { PropositionSocialComponent } from './Components/proposition-social/proposition-social.component';
import { PropositionGouvernanceComponent } from './Components/proposition-gouvernance/proposition-gouvernance.component';
import { NavProjetsComponent } from './Components/nav-projets/nav-projets.component';
import { NavCarbonneComponent } from './Components/nav-carbonne/nav-carbonne.component';
import { NavAcceuilComponent } from './Components/nav-acceuil/nav-acceuil.component';
import { ESGdiagramComponent } from './Components/esgdiagram/esgdiagram.component';
import { ArboricultureComponent } from './Components/arboriculture/arboriculture.component';
import {HttpClientModule} from "@angular/common/http";
import { PisteComponent } from './Components/piste/piste.component';
import { MarketplaceComponent } from './Components/marketplace/marketplace.component';
import { FilterItemComponent } from './Components/filter-item/filter-item.component';
import { ProjectAdComponent } from './Components/project-ad/project-ad.component';
import { FilterFieldsComponent } from './Components/filter-fields/filter-fields.component';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { FooterMarketPlaceComponent } from './Components/footer-market-place/footer-market-place.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ProjectOwnerComponent } from './Components/project-owner/project-owner.component';
import { ResourcesComponent } from './Components/resources/resources.component';
import { InfoComponent } from './Components/info/info.component';
import { MarketplaceBlogComponent } from './Components/marketplace-blog/marketplace-blog.component';
import { CarbonOffsetBlogComponent } from './Components/carbon-offset-blog/carbon-offset-blog.component';
import { CarbonCoBenifitsBlogComponent } from './Components/carbon-co-benifits-blog/carbon-co-benifits-blog.component';
import { RoadmapComponent } from './Components/roadmap/roadmap.component';
import { PaginationComponent } from './Components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    NavBarComponent,
    EnergieComponent,
    CarburantComponent,
    AeriensComponent,
    FretComponent,
    ConsommablesComponent,
    ImmobilisationsComponent,
    PorteurComponent,
    ESGComponent,
    Environnement1Component,
    Environnement2Component,
    Environnement3Component,
    Environnement4Component,
    SocialComponent,
    Social1Component,
    Social2Component,
    Social3Component,
    Social4Component,
    GouvernanceComponent,
    Gouvernance1Component,
    Gouvernance2Component,
    Gouvernance3Component,
    Gouvernance4Component,
    PanneauxComponent,
    ResultatCarboneComponent,
    Esg1Component,
    CarboneComponent,
    CarboneDiagramComponent,
    ResultESGComponent,
    PropositionEnvironnementComponent,
    PropositionSocialComponent,
    PropositionGouvernanceComponent,
    NavProjetsComponent,
    NavAcceuilComponent,
    ESGdiagramComponent,
    ArboricultureComponent,
    PisteComponent,
    MarketplaceComponent,
    FilterItemComponent,
    ProjectAdComponent,
    FilterFieldsComponent,
    ProjectDetailsComponent,
    CheckoutComponent,
    FooterMarketPlaceComponent,
    PaymentComponent,
    ProjectOwnerComponent,
    ResourcesComponent,
    InfoComponent,
    MarketplaceBlogComponent,
    CarbonOffsetBlogComponent,
    CarbonCoBenifitsBlogComponent,
    RoadmapComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
