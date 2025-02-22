import { Component } from '@angular/core';
import {Immobilisation} from "../../Models/immobilisation";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import Swal from "sweetalert2";
import {Fret} from "../../Models/fret";
import {FretService} from "../../Service/fret.service";

@Component({
  selector: 'app-fret',
  templateUrl: './fret.component.html',
  styleUrls: ['./fret.component.css']
})
export class FretComponent {
  fData: Fret = new Fret();

  constructor(private fService: FretService) { }
  submitData() {
    this.fService.addInformation(this.fData, 1, 2023).subscribe(
      response => {
        Swal.fire(response.toFixed(2).toString(),'Tonnes' , 'success')
      },
      error => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}
