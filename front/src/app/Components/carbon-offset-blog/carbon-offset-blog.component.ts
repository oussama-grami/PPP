import { Component } from '@angular/core';

@Component({
  selector: 'app-carbon-offset-blog',
  templateUrl: './carbon-offset-blog.component.html',
  styleUrls: ['./carbon-offset-blog.component.css']
})
export class CarbonOffsetBlogComponent {
  copyText(){
    navigator.clipboard.writeText("https://value.green/tn-fr/blog/compenser_empriente_carbone")
  }
  printPage(){
    window.print()
  }
}
