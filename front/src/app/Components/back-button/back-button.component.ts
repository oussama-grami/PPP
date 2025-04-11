import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent implements OnInit {
  @Input() customRoute: string | null = null;
  @Input() buttonText: string = 'Back';
  @Input() customClass: string = '';

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {}

  goBack(): void {
    if (this.customRoute) {
      this.router.navigate([this.customRoute]);
    } else {
      this.location.back();
    }
  }
}
