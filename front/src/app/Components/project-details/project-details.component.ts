import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../Models/project";
import {ProjectsService} from "../../Service/projects.service";
import {Transaction} from "../../Models/transaction";
import {TransactionService} from "../../Service/transaction.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  transactions:Transaction[] = [];
  projectId: number = 0;
  project: Project  = new Project();
  selectedImage = '/assets/img/details.png'
  carouselMainElement = '/assets/img/details1.png'
  carouselOtherElements = '/assets/img/details2.png'

  constructor(private route: ActivatedRoute,
              private projectsService: ProjectsService,
              private transactionService:TransactionService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      console.log(this.projectId);
    });
    this.transactionService.getTransactions().subscribe(
      data => {
        this.transactions = data;
      })
    this.projectsService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
      console.log("project is :"+data.description);
      console.log(this.project);
    })
    if (this.transactions.length > 10) {
      this.transactions = this.transactions.slice(-10);
    }

  }

  selectImage(imageUrl: any) {
    this.selectedImage = imageUrl;
  }

  protected readonly RoutesEnum = RoutesEnum;
}
