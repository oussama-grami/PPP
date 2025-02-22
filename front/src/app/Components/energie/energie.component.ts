import { Component } from '@angular/core';
import {EnergieService} from "../../Service/energie.service";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
import {Energie} from "../../Models/energie";

@Component({
  selector: 'app-energie',
  templateUrl: './energie.component.html',
  styleUrls: ['./energie.component.css']
})
export class EnergieComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  energieData: Energie = new Energie();

  constructor(private energyService: EnergieService) { }
  submitData() {
    this.energyService.addInformation(this.energieData, 1, 2023).subscribe(
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
