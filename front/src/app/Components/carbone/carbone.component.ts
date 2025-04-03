import {Component, OnInit} from '@angular/core';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-carbone',
  templateUrl: './carbone.component.html',
  styleUrls: ['./carbone.component.css']
})
export class CarboneComponent implements OnInit {
  ngOnInit() {

    window.scrollTo(0, 0);
  }

  protected readonly RoutesEnum = RoutesEnum;
}
