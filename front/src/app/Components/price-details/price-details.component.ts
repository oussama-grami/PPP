import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProjectsService} from "../../Service/projects.service";
import {project} from "../../Models/project";
import {CartService} from "../../Service/cart-service.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit, OnChanges {
  @Input() projectId: number = 0;
  project: project | undefined;
  quantity: number = 0;
  successMessage: boolean = false;
  protected readonly Number = Number;

  constructor(private projectsService: ProjectsService,
              private cartService: CartService,
              private routerService: Router
  ) {
  }

  ngOnInit() {
    this.getProject();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      this.getProject();
      this.quantity = 0;
    }
  }

  getProject() {
    this.projectsService.getProjectById(this.projectId).subscribe((data) => {
      this.project = data;
    });
  }

  onDecreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 10;
    }
  }

  onIncreaseQuantity() {
    if (this.quantity < this.project!.availableStock) {
      this.quantity += 10;
    }
  }

  showMessage() {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }

  //name' | 'availableStock' | 'cost' | 'url'> & { quantity: number
  onAddToCart() {
    this.cartService.addItem({
      name: this.project!.name,
      availableStock: this.project!.availableStock,
      cost: this.project!.cost,
      url: '/assets/img/modalPhoto1.svg',
      quantity: this.quantity
    })
    this.quantity = 0;
  }

  onAddingToCart() {
    this.onAddToCart();
    this.showMessage();
  }

  async onBuyNow() {
    this.onAddToCart();
    await this.routerService.navigate([RoutesEnum.CHECKOUT]);
  }
}
