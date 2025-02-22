import {Component, OnInit} from '@angular/core';
import {ScoreService} from "../../Service/score.service";
import {Categorie} from "../../enumerations/Categorie";

@Component({
  selector: 'app-result-esg',
  templateUrl: './result-esg.component.html',
  styleUrls: ['./result-esg.component.css']
})
export class ResultESGComponent implements OnInit{
  Envi : number=0;
  soc : number=0;
  gouv : number=0;
  Scores: number[] = [];
  environmentAction = true;
  socialAction = true;
  gouvernanceAction = true;
  constructor(private ScService : ScoreService) {}

  ngOnInit() {
    this.ScService.calculerScore(1, 2023,Categorie.Environnement).subscribe((score: number) => {
      this.Envi = score;
      console.log(this.Envi);
      
    });
    this.ScService.calculerScore(1, 2023,Categorie.Social).subscribe((score: number) => {
      this.soc = score;
      console.log(this.soc);
    });
    this.ScService.calculerScore(1, 2023,Categorie.Gouvernance).subscribe((score: number) => {
      this.gouv = score;
      console.log(this.gouv);
    });
    this.ScService.getScore(1, 2023).subscribe((scores: number[]) => { 
      this.environmentAction = this.proposeAction(scores.slice(0,5))
      this.socialAction = this.proposeAction(scores.slice(5,10))
      this.gouvernanceAction = this.proposeAction(scores.slice(10,15))
      
      
      
      
    });
    
  }
  disableTakeActionButton(){
    if(this.soc == 20 && this.Envi == 20 && this.gouv == 20){
      return false
    }
    else return true
  }
  proposeAction(scores:number[]):boolean{
    var result = false;
    scores.forEach((score)=>{
      if(score < 3){
        result = true;
      }
    })
    return result;
  }
  isEnviGreaterOrLessThanFive(): boolean {
    return this.Envi <= 5 && this.Envi >= 0;
  }
  isEnviGreaterOrLessThanff(){
    return this.Envi <= 10 && this.Envi >= 6;
  }
  isEnviGreaterThanqq() : boolean {
    return this.Envi <= 15 && this.Envi >= 11;
  }
  isEnviGreaterThanzz() : boolean{
    return this.Envi <= 20 && this.Envi >= 16;
  }
  isSociGreaterOrLessThanFive(): boolean {
    return this.soc <= 5 && this.soc >= 0;
  }
  isSociGreaterOrLessThanff(){
    return this.soc <= 10 && this.soc >= 6;
  }
  isSociGreaterThanqq() : boolean {
    return this.soc <= 15 && this.soc >= 11;
  }
  isSociGreaterThanzz() : boolean{
    return this.soc <= 20 && this.soc >= 16;
  }


  isGouvGreaterOrLessThanFive(): boolean {
    return this.gouv <= 5 && this.gouv >= 0;
  }
  isGouvGreaterOrLessThanff() :boolean{
    return this.gouv <= 10 && this.gouv >= 6;
  }
  isGouvGreaterThanqq() : boolean {
    return this.gouv <= 15 && this.gouv >= 11;
  }
  isGouvGreaterThanzz() : boolean{
    return this.gouv <= 20 && this.gouv >= 16;
  }
}
