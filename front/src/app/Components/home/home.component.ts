import {Component} from '@angular/core';
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

    protected readonly RoutesEnum = RoutesEnum;
}
