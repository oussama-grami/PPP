import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-acceuil',
  templateUrl: './nav-acceuil.component.html',
  styleUrls: ['./nav-acceuil.component.css']
})
export class NavAcceuilComponent {
  @Input() selected=9;

}
