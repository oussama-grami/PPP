import {Component, Input} from '@angular/core';
import {project} from "../../Models/project";

@Component({
  selector: 'app-project-ad',
  templateUrl: './project-ad.component.html',
  styleUrls: ['./project-ad.component.css']
})
export class ProjectAdComponent {
  @Input() project:project |undefined;
}
