import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProjectsService} from "../../Service/projects.service";
import {project} from "../../Models/project";

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit, OnChanges {
  @Input() projectId: number = 0;
  project: project | undefined;
  quantity: number = 0;

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.getProject();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      this.getProject();
      this.quantity = 0;
    }
  }

  getProject() {
    this.projectsService.getProjectById(this.projectId).subscribe((data) => {
      this.project = data;
    });
  }

  onDecreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 10;
    }
  }

  onIncreaseQuantity() {
    if (this.quantity < this.project!.availableStock) {
      this.quantity += 10;
    }
  }

  protected readonly Number = Number;
}
