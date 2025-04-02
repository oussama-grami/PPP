import { Component, OnInit } from '@angular/core';
import { CartService } from "../../Service/cart-service.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems = this.cartService.getItems();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    console.log(this.cartItems)
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  protected readonly RoutesEnum = RoutesEnum;
}
