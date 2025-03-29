import {Component, OnInit} from '@angular/core';
import {Esg} from "../../Models/esg";
import {EsgServiceService} from "../../Service/esg-service.service";
import {Categorie} from "../../enumerations/Categorie";
import {Partie} from "../../enumerations/Partie";
import {ScoreService} from "../../Service/score.service";
interface Option {
  text: string;
  isSelected: boolean;
  score3: number; // Add the 'score' property to the Option interface
}
@Component({
  selector: 'app-environnement3',
  templateUrl: './environnement3.component.html',
  styleUrls: ['./environnement3.component.css']
})
export class Environnement3Component implements OnInit{
  esg: Esg = new Esg();
  options: Option[] = []; // Initialize as an empty array
  vl!: number;
  choiceSelected = false
  warnUser = false
  constructor(private esgService : EsgServiceService,private scService: ScoreService) {}
  ngOnInit() {
    this.esgService.getEsg(Categorie.Environnement, Partie.Four).subscribe(
      (data: Esg) => {
        this.esg = data; // Assign the retrieved data to the 'esg' property

        // Now that 'esg' is populated, you can initialize 'options'
        this.options = [
          { text: this.esg.q1, isSelected: false, score3: 0 },
          { text: this.esg.q2, isSelected: false, score3: 1 },
          { text: this.esg.q3, isSelected: false, score3: 2 },
          { text: this.esg.q4, isSelected: false, score3: 3 },
          { text: this.esg.q5, isSelected: false, score3: 4 },
        ];
      },
      (error) => {
        console.error(error); // Handle errors here
      }
    );
  }

  onDivClick(selectedOption: Option): void {
    this.options.forEach((option) => {
      option.isSelected = option === selectedOption;
    });
    this.vl=selectedOption.score3;
    this.choiceSelected = true

  }
  addScore(){
    if (!this.vl) {
      this.vl = 0;
    }
    this.scService.addScore(this.vl,1,2023,this.esg.id)

  }
  warning(){
    this.warnUser=true
  }

}
