import {Component, HostListener, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  projectId :number |undefined;
  selectedImage='/assets/img/details.png'
  carouselMainElement='/assets/img/details1.png'
  carouselOtherElements='/assets/img/details2.png'
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
  }


  selectImage(imageUrl:any){
    this.selectedImage = imageUrl;

  }

}
