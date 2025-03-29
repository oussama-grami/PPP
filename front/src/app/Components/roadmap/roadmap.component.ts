import { Component } from '@angular/core';
import { ScoreService } from 'src/app/Service/score.service';
import { Categorie } from 'src/app/enumerations/Categorie';
import { Partie } from 'src/app/enumerations/Partie';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
  Envi1 : number = 1;
  Envi2 : number = 1;
  Envi3 : number = 1;
  Envi4 : number = 1;
  Envi5 : number = 1;
  GOUV1 : number = 1;
  GOUV2 : number = 1;
  GOUV3 : number = 1;
  GOUV4 : number = 1;
  GOUV5 : number = 1;
  Soc1 : number = 1 ;
  Soc2 : number = 1 ;
  Soc3 : number = 1;
  Soc4 : number = 1;
  Soc5 : number = 1;
  constructor(private scService : ScoreService) { }

  ngOnInit() {
    this.scService.getval(2023, 1,Categorie.Environnement, Partie.One).subscribe((score: number) => {
      this.Envi1 = score;
      console.log(score);

    });
    this.scService.getval(2023, 1,Categorie.Environnement, Partie.Two).subscribe((score: number) => {
      this.Envi2 = score;
      console.log(score);
    });
    this.scService.getval(2023, 1,Categorie.Environnement, Partie.Three).subscribe((score: number) => {
      this.Envi3 = score;
      console.log(score);
    });
    this.scService.getval(2023, 1,Categorie.Environnement, Partie.Four).subscribe((score: number) => {
      this.Envi4 = score;
      console.log(score);
    });
    this.scService.getval(2023, 1,Categorie.Environnement, Partie.Five).subscribe((score: number) => {
      this.Envi5 = score;
      console.log(score);
    });
    this.scService.getval(2023, 1,Categorie.Gouvernance, Partie.One).subscribe((score: number) => {
      this.GOUV1 = score;
    });
    this.scService.getval(2023, 1,Categorie.Gouvernance, Partie.Two).subscribe((score: number) => {
      this.GOUV2 = score;
    });
    this.scService.getval(2023, 1,Categorie.Gouvernance, Partie.Three).subscribe((score: number) => {
      this.GOUV3 = score;
    });
    this.scService.getval(2023, 1,Categorie.Gouvernance, Partie.Four).subscribe((score: number) => {
      this.GOUV4 = score;
    });
    this.scService.getval(2023, 1,Categorie.Gouvernance, Partie.Five).subscribe((score: number) => {
      this.GOUV5 = score;
    });
    this.scService.getval(2023, 1,Categorie.Social, Partie.One).subscribe((score: number) => {
      this.Soc1 = score;
    });
    this.scService.getval(2023, 1,Categorie.Social, Partie.Two).subscribe((score: number) => {
      this.Soc2 = score;
    });
    this.scService.getval(2023, 1,Categorie.Social, Partie.Three).subscribe((score: number) => {
      this.Soc3 = score;
    });
    this.scService.getval(2023, 1,Categorie.Social, Partie.Four).subscribe((score: number) => {
      this.Soc4 = score;
    });
    this.scService.getval(2023, 1,Categorie.Social, Partie.Five).subscribe((score: number) => {
      this.Soc5 = score;
    });
  }
}
