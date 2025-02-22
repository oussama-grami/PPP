import { Component } from '@angular/core';

@Component({
  selector: 'app-carbon-co-benifits-blog',
  templateUrl: './carbon-co-benifits-blog.component.html',
  styleUrls: ['./carbon-co-benifits-blog.component.css']
})
export class CarbonCoBenifitsBlogComponent {
  copyText(){
    navigator.clipboard.writeText("https://value.green/tn-fr/blog/compenser_empriente_carbone")
  }
  printPage(){
    window.print()
  }
}
