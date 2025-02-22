import { Component } from '@angular/core';
import {Hauteur} from "../../enumerations/Hauteur";
import {Stade} from "../../enumerations/Stade";
import {TypeArbre} from "../../enumerations/TypeArbre";
import Swal from "sweetalert2";
import {Arboriculture} from "../../Models/arboriculture";
import {ArboricultureService} from "../../Service/arboriculture.service";

@Component({
  selector: 'app-arboriculture',
  templateUrl: './arboriculture.component.html',
  styleUrls: ['./arboriculture.component.css']
})
export class ArboricultureComponent {
  protected readonly TypeArbre = TypeArbre;
  protected readonly Stade = Stade;
  protected readonly Hauteur = Hauteur;
  arbData: Arboriculture = new Arboriculture();
  constructor(private arbService: ArboricultureService) { }
  submitData() {

    if(this.arbData.hauteur && this.arbData.stade && this.arbData.nbArbre && this.arbData.typeArbre){
      this.arbService.addInformation(this.arbData, 1, 2023).subscribe(
        response => {
          
          Swal.fire(response.toFixed(2).toString(),'Tonnes' , 'success')
        },
        error => {
          console.error('Error:', error);
          
        }
      );
    }
  }
}
