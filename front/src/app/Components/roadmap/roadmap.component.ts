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
  Envi1 !: number;
  Envi2 !: number;
  Envi3 !: number;
  Envi4 !: number;
  Envi5 !: number;
  GOUV1 !: number;
  GOUV2 !: number;
  GOUV3 !: number;
  GOUV4 !: number;
  GOUV5 !: number;
  Soc1 !: number;
  Soc2 !: number;
  Soc3 !: number;
  Soc4 !: number;
  Soc5 !: number;
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
