import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-ad',
  templateUrl: './project-ad.component.html',
  styleUrls: ['./project-ad.component.css']
})
export class ProjectAdComponent {
  @Input() url:string="/assets/img/projet1.png"
  @Input() flag: string="/assets/img/tunisiaFlag.svg";
  @Input() category: string="Arbres & ForêtsXXXX";
  @Input() cost: string="000";
  @Input() name: string="Panneaux solaires à Casablanca";
  @Input() routing: string ="s"

}
