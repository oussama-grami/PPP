import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location}  from '@angular/common';
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input() url? : string ;
  @Input() text? : string ;

  constructor(private router: Router , private location:Location) { }

  ngOnInit(): void {
    if (!this.text) {
      this.text = "back";
    }
  }
  goBack()
  {
    if(!this.url) {
      this.location.back();
    }
    this.router.navigate([this.url]);
  }
}
