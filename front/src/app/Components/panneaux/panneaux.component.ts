import { Component, ElementRef, Renderer2 } from '@angular/core';
import {Immobilisation} from "../../Models/immobilisation";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import Swal from "sweetalert2";
import {Panneaux} from "../../Models/panneaux";
import {PanneauxService} from "../../Service/panneaux.service";

@Component({
  selector: 'app-panneaux',
  templateUrl: './panneaux.component.html',
  styleUrls: ['./panneaux.component.css']
})
export class PanneauxComponent {
  annualConsumption=0;
  minRangeConsumption=0;
  maxRangeConsumption=0;
  displayResult= false;
  panData: Panneaux = new Panneaux();
  ngOnInit() {
    window.scrollTo(0, 0);
    this.panData.pays="Tunisia"
  }
 res!:string;
  constructor(private panService: PanneauxService,private el: ElementRef, private renderer: Renderer2) { }
  submitData() {
    this.panService.addInformation(this.panData, 1, 2023).subscribe(
      response => {
        // Swal.fire(response, 'success')
        this.res=response;
      },
      error => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
  onClick(){
    
    if(this.panData.consommation && this.panData.consommation != 0){
      this.displayResult = true
      this.annualConsumption = this.panData.consommation / 1000 * 0.463;
      this.minRangeConsumption = this.panData.consommation * 20 / 1000000;
      this.maxRangeConsumption = this.panData.consommation * 60 / 1000000;
      // Swal.fire(this.annualConsumption.toString(), 'success')
      
      setTimeout(() => {
        let targetDiv = this.el.nativeElement.querySelector('#footer');
        console.log(targetDiv);
      
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
   
    
      

      
      // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      
    }
    else{
      this.displayResult = false;
    }

    
  }
}

