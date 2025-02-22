import { Component } from '@angular/core';
import {CarburantService} from "../../Service/carburant.service";
import {EnergieService} from "../../Service/energie.service";
import {ConsommablesService} from "../../Service/consommables.service";
import {AerienService} from "../../Service/aerien.service";
import {FretService} from "../../Service/fret.service";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-piste',
  templateUrl: './piste.component.html',
  styleUrls: ['./piste.component.css']
})
export class PisteComponent {
  emE : number=0;
  emC : number=0;
  emD : number=0;
  emF : number=0;
  emI : number=0;
  emCo : number=0;
  total : number=0;
  clicked1=false
  clicked2=false
  clicked3=false
  clicked4=false
  clicked5=false
  constructor(private carService : CarburantService,private eneService : EnergieService,private conService : ConsommablesService,private depService : AerienService,private fretService : FretService,private  immService : ImmobilisationService) {}


  ngOnInit(): void {
    window.scrollTo(0, 0);

    const observables = [
      this.carService.calculer(2023, 1),
      this.eneService.calculer(2023, 1),
      this.conService.calculer(2023, 1),
      this.depService.calculer(2023, 1),
      this.fretService.calculer(2023, 1),
      this.immService.calculer(2023, 1),
    ];

    forkJoin(observables).subscribe((results: number[]) => {
      [this.emC, this.emE,this.emCo,this.emD,this.emF,this.emI] = results;

      this.total = this.emI + this.emE + this.emD + this.emCo + this.emF + this.emC;

    });
  }
  selected1(){
    this.clicked1 = !this.clicked1;
  }
  selected2(){
    this.clicked2 = !this.clicked2;
  }
  selected3(){
    this.clicked3 = !this.clicked3;
  }
  selected4(){
    this.clicked4 = !this.clicked4;
  }
  selected5(){
    this.clicked5 = !this.clicked5;
  }
}
