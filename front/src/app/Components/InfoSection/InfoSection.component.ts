import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-InfoSection',
  templateUrl: './InfoSection.component.html',
  styleUrls: ['./InfoSection.component.css'],


})
export class InfoSectionComponent implements OnInit {
  @Input () title: string = '';
  @Input () paragraphs: string[] = [];
  @Input () image: string = '';
  @Input () imageAlt: string = '';
  @Input () buttonText: string = '';
  @Input() buttonLink: string | any[] = '';
  constructor(private router:Router) { }

  ngOnInit() {
  }
  navigateToLink() {
    if (Array.isArray(this.buttonLink)) {
      this.router.navigate(this.buttonLink);
    } else {
      this.router.navigate([this.buttonLink]);
    }
  }


}
