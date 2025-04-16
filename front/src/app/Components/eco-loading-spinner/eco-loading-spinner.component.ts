import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eco-loading-spinner',
  templateUrl: './eco-loading-spinner.component.html',
  styleUrls: ['./eco-loading-spinner.component.css']
})
export class EcoLoadingSpinnerComponent implements OnInit {
  @Input() loadingText: string = 'Loading ...';

  constructor() { }

  ngOnInit() {
  }

}
