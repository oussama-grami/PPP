import {Component, Input} from '@angular/core';
import {project} from "../../Models/project";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-project-ad',
  templateUrl: './project-ad.component.html',
  styleUrls: ['./project-ad.component.css']
})
export class ProjectAdComponent {
  @Input() project:project |undefined;
  protected readonly RoutesEnum = RoutesEnum;
}
