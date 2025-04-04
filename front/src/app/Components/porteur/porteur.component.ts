import {Component, OnInit} from '@angular/core';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-porteur',
  templateUrl: './porteur.component.html',
  styleUrls: ['./porteur.component.css']
})
export class PorteurComponent implements OnInit {
  ngOnInit() {

    window.scrollTo(0, 0);
  }

  protected readonly RoutesEnum = RoutesEnum;
}
