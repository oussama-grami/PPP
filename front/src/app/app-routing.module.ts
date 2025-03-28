import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {CommonModule} from "@angular/common";
import {NavBarComponent} from "./Components/nav-bar/nav-bar.component";
import {EnergieComponent} from "./Components/energie/energie.component";
import {CarburantComponent} from "./Components/carburant/carburant.component";
import {AeriensComponent} from "./Components/aeriens/aeriens.component";
import {FretComponent} from "./Components/fret/fret.component";
import {ConsommablesComponent} from "./Components/consommables/consommables.component";
import {ImmobilisationsComponent} from "./Components/immobilisations/immobilisations.component";
import {PorteurComponent} from "./Components/porteur/porteur.component";
import {ESGComponent} from "./Components/esg/esg.component";
import {Environnement1Component} from "./Components/environnement1/environnement1.component";
import {Environnement2Component} from "./Components/environnement2/environnement2.component";
import {Environnement3Component} from "./Components/environnement3/environnement3.component";
import {Environnement4Component} from "./Components/environnement4/environnement4.component";
import {SocialComponent} from "./Components/social/social.component";
import {Social1Component} from "./Components/social1/social1.component";
import {Social2Component} from "./Components/social2/social2.component";
import {Social3Component} from "./Components/social3/social3.component";
import {Social4Component} from "./Components/social4/social4.component";
import {GouvernanceComponent} from "./Components/gouvernance/gouvernance.component";
import {Gouvernance1Component} from "./Components/gouvernance1/gouvernance1.component";
import {Gouvernance2Component} from "./Components/gouvernance2/gouvernance2.component";
import {Gouvernance3Component} from "./Components/gouvernance3/gouvernance3.component";
import {Gouvernance4Component} from "./Components/gouvernance4/gouvernance4.component";
import {PanneauxComponent} from "./Components/panneaux/panneaux.component";
import {ResultatCarboneComponent} from "./Components/resultat-carbone/resultat-carbone.component";
import {Esg1Component} from "./Components/esg1/esg1.component";
import {CarboneComponent} from "./Components/carbone/carbone.component";
import {CarboneDiagramComponent} from "./Components/carbone-diagram/carbone-diagram.component";
import {ResultESGComponent} from "./Components/result-esg/result-esg.component";
import {PropositionEnvironnementComponent} from "./Components/proposition-environnement/proposition-environnement.component";
import {PropositionSocialComponent} from "./Components/proposition-social/proposition-social.component";
import {PropositionGouvernanceComponent} from "./Components/proposition-gouvernance/proposition-gouvernance.component";
import {ArboricultureComponent} from "./Components/arboriculture/arboriculture.component";
import {ESGdiagramComponent} from "./Components/esgdiagram/esgdiagram.component";
import {PisteComponent} from "./Components/piste/piste.component";
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

const routes: Routes = [
  { path:'', component: HomeComponent },//EYA
  {path : 'porteur',component : PorteurComponent},
  {path : 'energie',component : EnergieComponent},
  {path : 'car',component : CarburantComponent},
  {path : 'aer',component : AeriensComponent},
  {path : 'fret',component : FretComponent},
  {path : 'cons',component : ConsommablesComponent},
  {path : 'imob',component : ImmobilisationsComponent},
  {path : 'esg',component : ESGComponent},//replaced by esg assessement
  {path : 'env',component : Environnement1Component},//deleted
  {path : 'env1',component : Environnement2Component},//deleted
  {path : 'env2',component : Environnement3Component},//deleted
  {path : 'env3',component : Environnement4Component},
  {path: 'social',component : SocialComponent},
  {path : 'social1',component :Social1Component},
  {path:'social2',component : Social2Component},
  {path:'social3',component:Social3Component},
  {path:'social4',component:Social4Component},
  {path:'gouv',component : GouvernanceComponent},
  {path:'gouv1',component : Gouvernance1Component},
  {path:'gouv2',component : Gouvernance2Component},
  {path:'gouv3',component : Gouvernance3Component},
  {path:'gouv4',component : Gouvernance4Component},//deleted
  {path:'pan',component : PanneauxComponent},//Aziz
  {path : 'resultat',component : ResultatCarboneComponent},//Eya
  {path : 'esg1',component : Esg1Component},//completed
  {path : 'carbone',component : CarboneComponent},//Completed
  {path:'test',component: ESGdiagramComponent},//Samar
  {path:'ress',component : ResultESGComponent},//Samar
  {path:'propEnv',component : PropositionEnvironnementComponent},//Samar
  {path:'propSoc',component : PropositionSocialComponent},//Samar
  {path:'propGouv',component : PropositionGouvernanceComponent},//Samar
  {path:'arb',component : ArboricultureComponent},//Aziz
  {path:'piste',component : PisteComponent},//untouched
  {path:'marketplace',component : MarketplaceComponent},//completed --Oussema
  {path: 'details/:id', component: ProjectDetailsComponent},//completed --Oussama
  {path: 'checkout', component: CheckoutComponent},//Aziz
  {path: 'payment', component: PaymentComponent},//Oussama
  {path: 'new-project', component: ProjectOwnerComponent},//Aziz
  {path: 'resources', component: ResourcesComponent},//completed --Oussama
  {path: 'info', component: InfoComponent},//eya
  {path: 'marketplace-blog', component: MarketplaceBlogComponent},// completed --Oussama
  {path: 'carbon-offset-blog', component: CarbonOffsetBlogComponent},//completed --Oussama
  {path: 'carbon-co-benefits-blog', component: CarbonCoBenifitsBlogComponent},//completed --Oussama
  {path: 'roadmap', component: RoadmapComponent},// Samar
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
