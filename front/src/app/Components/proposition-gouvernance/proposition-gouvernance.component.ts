import { Component } from '@angular/core';
import {ScoreService} from "../../Service/score.service";
import {Categorie} from "../../enumerations/Categorie";
import {Partie} from "../../enumerations/Partie";

@Component({
  selector: 'app-proposition-gouvernance',
  templateUrl: './proposition-gouvernance.component.html',
  styleUrls: ['./proposition-gouvernance.component.css']
})
export class PropositionGouvernanceComponent {
  GOUV1 !: number;
  GOUV2 !: number;
  GOUV3 !: number;
  GOUV4 !: number;
  GOUV5 !: number;
  constructor(private scService : ScoreService) { }

  ngOnInit() {
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
  }

  PrintGouv() {
    const url = 'http://localhost:4200/assets/upload_files/gouver.pdf';
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      console.error('Failed to open window');
    }
  }
}
