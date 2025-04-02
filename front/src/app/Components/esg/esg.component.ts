import {Component, OnInit} from '@angular/core';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';
@Component({
  selector: 'app-esg',
  templateUrl: './esg.component.html',
  styleUrls: ['./esg.component.css']
})
export class EsgComponent implements OnInit{
  routesEnum = RoutesEnum;
  ngOnInit() {

    window.scrollTo(0, 0);
  }
}
