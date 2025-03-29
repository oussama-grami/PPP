import {Component, HostListener, OnInit} from '@angular/core';
import {ScoreService} from "../../Service/score.service";
import {Categorie} from "../../enumerations/Categorie";
import {Partie} from "../../enumerations/Partie";

@Component({
  selector: 'app-proposition-environnement',
  templateUrl: './proposition-environnement.component.html',
  styleUrls: ['./proposition-environnement.component.css']
})
export class PropositionEnvironnementComponent implements OnInit{
  isScrolled: boolean = false;
  Envi1 !: number;
  Envi2 !: number;
  Envi3 !: number;
  Envi4 !: number;
  Envi5 !: number;
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
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = (window.pageYOffset > 0);
  }
  PrintEnv() {
    const url = 'http://localhost:4200/assets/upload_files/environnement.pdf';
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      console.error('Failed to open window');
    }
  }
}
