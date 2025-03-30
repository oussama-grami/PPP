import {Component, OnInit} from '@angular/core';
import {EsgService} from 'src/app/Service/esg.service';

@Component({
  selector: 'app-result-esg',
  templateUrl: './result-esg.component.html',
  styleUrls: ['./result-esg.component.css']
})
export class ResultESGComponent implements OnInit{
  Envi : number=0;
  soc : number=0;
  gouv : number=0;
  scores : any;
  
  constructor(private ScoreService:EsgService) {}

  ngOnInit() {
  

    this.scores=this.ScoreService.calculateEsg();
    this.Envi=this.scores.Environment;
    this.soc=this.scores.Social;
    this.gouv=this.scores.Gouvernance;


  }
  disableTakeActionButton(){
    if(this.soc == 20 && this.Envi == 20 && this.gouv == 20){
      return false
    }
    else return true
  }
  

 
}
