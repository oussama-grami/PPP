import { Component } from '@angular/core';
import {Energie} from "../../Models/energie";
import {EnergieService} from "../../Service/energie.service";
import Swal from "sweetalert2";
import {Consommables} from "../../Models/consommables";
import {ConsommablesService} from "../../Service/consommables.service";
import {Unite} from "../../enumerations/unite";

@Component({
  selector: 'app-consommables',
  templateUrl: './consommables.component.html',
  styleUrls: ['./consommables.component.css']
})
export class ConsommablesComponent {
  consData: Consommables = new Consommables();
  protected readonly Unite = Unite;
  ngOnInit(){
    this.consData.unite1 = Unite.Dolar
    this.consData.unite2 = Unite.Dolar

  }

  constructor(private consService : ConsommablesService) { }
  submitData() {
    this.consService.addInformation(this.consData, 1, 2023).subscribe(
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
