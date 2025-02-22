import { Component } from '@angular/core';
import {Immobilisation} from "../../Models/immobilisation";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import Swal from "sweetalert2";
import {CarburantService} from "../../Service/carburant.service";
import {Carburant} from "../../Models/carburant";
import {Unite} from "../../enumerations/unite";
import {TypeCarburant} from "../../enumerations/typeCarburant";

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent {
  carData: Carburant = new Carburant();
  ngOnInit() {
    window.scrollTo(0, 0);
    
  }

  constructor(private carService: CarburantService) { }
  submitData() {
    this.carService.addInformation(this.carData, 1, 2023).subscribe(
      response => {

        Swal.fire(response.toFixed(2).toString(),'Tonnes' , 'success')
      },
      error => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }

  protected readonly Unite = Unite;
  protected readonly TypeCarburant = TypeCarburant;
}
