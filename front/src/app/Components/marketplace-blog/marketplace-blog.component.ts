import { Component } from '@angular/core';

@Component({
  selector: 'app-marketplace-blog',
  templateUrl: './marketplace-blog.component.html',
  styleUrls: ['./marketplace-blog.component.css']
})
export class MarketplaceBlogComponent {
  copyText(){
    navigator.clipboard.writeText("https://value.green/tn-fr/blog/compenser_empriente_carbone")
  }
  printPage(){
    window.print()
  }

}
