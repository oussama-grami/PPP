import {Component, OnInit} from '@angular/core';
import {CartService} from "../../Service/cart-service.service";

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
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }
}
