import { Component } from '@angular/core';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-event-footprint',
  templateUrl: './event-footprint.component.html',
  styleUrls: ['./event-footprint.component.css']
})
export class EventFootprintComponent {

  protected readonly RoutesEnum = RoutesEnum;
}
