import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  selectedImage='/assets/img/details.png'
  carouselMainElement='/assets/img/details1.png'
  carouselOtherElements='/assets/img/details2.png'
  
  ngOnInit() {
    window.scrollTo(0, 0);
  }


  selectImage(imageUrl:any){
    this.selectedImage = imageUrl;
    
  }

}
