import { Component } from '@angular/core';
import {Immobilisation} from "../../Models/immobilisation";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import Swal from "sweetalert2";
import {DeplacemetAerien} from "../../Models/deplacemetAerien";
import {AerienService} from "../../Service/aerien.service";

@Component({
  selector: 'app-aeriens',
  templateUrl: './aeriens.component.html',
  styleUrls: ['./aeriens.component.css']
})
export class AeriensComponent {
  depData: DeplacemetAerien = new DeplacemetAerien();

  constructor(private depService: AerienService) { }
  submitData() {
    this.depService.addInformation(this.depData, 1, 2023).subscribe(
      response => {
        Swal.fire(response.toFixed(2).toString(),'Tonnes' , 'success')

      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
