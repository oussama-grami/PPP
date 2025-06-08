import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../../Service/cart-service.service';
import { RoutesEnum } from '../../enumerations/Routes.enum';
import { environment } from '../../../environments/environment';

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

  removeItem(index: number) {
    // Add smooth removal animation
    this.cartItems[index].removing = true;

    // Add haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    setTimeout(() => {
      this.cartService.removeItem(index);
      this.cartItems = this.cartService.getItems();
    }, 400); // Match CSS animation duration
  }

  // Enhanced helper methods
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getAveragePrice(): number {
    if (this.cartItems.length === 0) return 0;
    const totalValue = this.cartItems.reduce(
      (total, item) => total + item.quantity * +item.cost,
      0
    );
    const totalQuantity = this.getTotalQuantity();
    return totalValue / totalQuantity;
  }

  // Add method to handle quantity changes with animation
  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getItems();
    this.animateQuantityChange(index);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartService.decreaseQuantity(index);
      this.cartItems = this.cartService.getItems();
      this.animateQuantityChange(index);
    }
  }

  private animateQuantityChange(index: number) {
    const quantityElement = document.querySelector(
      `.cart-item:nth-child(${index + 1}) .quantity-display`
    );
    if (quantityElement) {
      quantityElement.classList.add('quantity-updated');
      setTimeout(() => {
        quantityElement.classList.remove('quantity-updated');
      }, 300);
    }
  }

  protected readonly environment = environment;
}
