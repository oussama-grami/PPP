import { Component } from '@angular/core';
import {ScoreService} from "../../Service/score.service";
import {Categorie} from "../../enumerations/Categorie";
import {Partie} from "../../enumerations/Partie";

@Component({
  selector: 'app-proposition-social',
  templateUrl: './proposition-social.component.html',
  styleUrls: ['./proposition-social.component.css']
})
export class PropositionSocialComponent {

  Soc1 !: number;
  Soc2 !: number;
  Soc3 !: number;
  Soc4 !: number;
  Soc5 !: number;
  constructor(private scService : ScoreService) { }

  ngOnInit() {
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
  PrintSoc() {
    const url = 'http://localhost:4200/assets/upload_files/social.pdf';
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      console.error('Failed to open window');
    }
  }
}
