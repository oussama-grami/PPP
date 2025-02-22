import { Component } from '@angular/core';
import {Energie} from "../../Models/energie";
import {EnergieService} from "../../Service/energie.service";
import Swal from "sweetalert2";
import {Immobilisation} from "../../Models/immobilisation";
import {ImmobilisationService} from "../../Service/immobilisation.service";

@Component({
  selector: 'app-immobilisations',
  templateUrl: './immobilisations.component.html',
  styleUrls: ['./immobilisations.component.css']
})
export class ImmobilisationsComponent {
  immeData: Immobilisation = new Immobilisation();

  constructor(private immService: ImmobilisationService) { }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  submitData() {
    this.immService.addInformation(this.immeData, 1, 2023).subscribe(
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
