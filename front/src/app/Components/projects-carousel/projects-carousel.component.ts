import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../Service/projects.service';
import { Project } from '../../Models/project';

@Component({
  selector: 'app-projects-carousel',
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.css']
})
export class ProjectsCarouselComponent implements OnInit {
  projects: Project[] = [];
  projectChunks: Project[][] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data;
      this.chunkProjects();
    });
  }

  chunkProjects(): void {
    const chunkSize = 4;
    for (let i = 0; i < this.projects.length; i += chunkSize) {
      this.projectChunks.push(this.projects.slice(i, i + chunkSize));
    }
  }
}
