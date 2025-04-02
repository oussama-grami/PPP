import { Component, OnInit } from '@angular/core';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';
@Component({
  selector: 'app-CarbonPredictionInfo',
  templateUrl: './CarbonPredictionInfo.component.html',
  styleUrls: ['./CarbonPredictionInfo.component.css']
})
export class CarbonPredictionInfoComponent implements OnInit {

  routesEnum = RoutesEnum;
  constructor() { }

  ngOnInit() {
  }

}
