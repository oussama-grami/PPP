import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from "../../Service/projects.service";
import {project} from "../../Models/project";

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent  implements OnInit {
@Input() projectId : number =0;
project: project | undefined ;
quantity:number = 0;
constructor(private projectsService:ProjectsService) {
}
ngOnInit() {
  this.getProject();
}

  getProject(){
  this.project = this.projectsService.getProjectById(this.projectId);
  console.log(this.project);
}

  onDecreaseQuantity() {
    if(this.quantity > 0){
      this.quantity -= 10;
    }
  }

  onIncreaseQuantity() {
    if(this.quantity < this.project!.availableStock){
        this.quantity += 10;
    }
  }

  protected readonly Number = Number;
}
