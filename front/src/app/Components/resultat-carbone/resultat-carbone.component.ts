import {Component, OnInit} from '@angular/core';
import {ScoreService} from "../../Service/score.service";
import {CarburantService} from "../../Service/carburant.service";
import {EnergieService} from "../../Service/energie.service";
import {ConsommablesService} from "../../Service/consommables.service";
import {AerienService} from "../../Service/aerien.service";
import {FretService} from "../../Service/fret.service";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import {Categorie} from "../../enumerations/Categorie";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-resultat-carbone',
  templateUrl: './resultat-carbone.component.html',
  styleUrls: ['./resultat-carbone.component.css']
})
export class ResultatCarboneComponent implements OnInit{
  value = 50;
  emE : number=0;
  emC : number=0;
  emD : number=0;
  emF : number=0;
  emI : number=0;
  emCo : number=0;
  total : number=0;
  percentageA : number=0;
  percentageE : number=0;
  percentageC : number=0;
  percentageI : number=0;
  percentageCo : number=0;
  percentageF : number=0;
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

      if (this.total !== 0) {
        this.percentageA = (this.emD / this.total) * 100;
        this.percentageE = (this.emE / this.total) * 100;
        this.percentageI = (this.emI / this.total) * 100;
        this.percentageC = (this.emC / this.total) * 100;        
        this.percentageCo = (this.emCo / this.total) * 100;
        this.percentageF = (this.emF / this.total) * 100;
      }
      console.log(this.emC);
      

      console.log("Energy",this.percentageE);
      console.log("Fuel",this.percentageC);
      console.log("Air travel",this.percentageA);
      console.log("Freights",this.percentageF);
      console.log("Consumables",this.percentageCo);
      console.log("Fixed assets",this.percentageI);
      


    });
  }
}
