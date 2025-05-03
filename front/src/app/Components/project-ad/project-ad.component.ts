import {Component, Input} from '@angular/core';
import {Project} from "../../Models/project";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-project-ad',
  templateUrl: './project-ad.component.html',
  styleUrls: ['./project-ad.component.css']
})
export class ProjectAdComponent {
  @Input() project:Project |undefined;
  protected readonly RoutesEnum = RoutesEnum;
}
