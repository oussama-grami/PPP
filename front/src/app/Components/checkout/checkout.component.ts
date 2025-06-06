import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../../Service/cart-service.service';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems = this.cartService.getItems();
  showEmptyCartNotification = false;
  protected readonly RoutesEnum = RoutesEnum;
  protected readonly history = history;

  constructor(
    private cartService: CartService,
    private router: Router,
    public location: Location
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.showEmptyCartNotification = true;
      // Auto-hide notification after 4 seconds
      setTimeout(() => {
        this.showEmptyCartNotification = false;
      }, 4000);
    } else {
      this.router.navigate([`/${this.RoutesEnum.PAYMENT}`]);
    }
  }

  dismissNotification(): void {
    this.showEmptyCartNotification = false;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
  }
}
