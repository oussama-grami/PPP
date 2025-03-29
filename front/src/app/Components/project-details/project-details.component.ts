import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {project} from "../../Models/project";
import {ProjectsService} from "../../Service/projects.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  projectId: number | undefined;
  projects: project[] = [];
  selectedImage = '/assets/img/details.png'
  carouselMainElement = '/assets/img/details1.png'
  carouselOtherElements = '/assets/img/details2.png'

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.projectsService.getProjects().subscribe(data => {
        this.projects = data;
      });
    });
  }

  selectImage(imageUrl: any) {
    this.selectedImage = imageUrl;
  }

}
