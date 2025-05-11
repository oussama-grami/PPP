import { Injectable } from '@angular/core';
import { Project } from '../Models/project';

type PartialProject = Partial<Project> &
  Pick<Project, 'id' | 'name' | 'availableStock' | 'cost' | 'url'> & {
    quantity: number;
  };

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: PartialProject[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getItems(): PartialProject[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.quantity || 0) * (+item.cost || 0),
      0
    );
  }

  addItem(item: PartialProject) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 0) + (item.quantity || 1);
    } else {
      this.cartItems.push({ ...item, quantity: item.quantity || 1 });
    }
    this.saveCart();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number) {
    if (this.cartItems[index].quantity < this.cartItems[index].availableStock) {
      this.cartItems[index].quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.removeItem(index);
    }
    this.saveCart();
  }
  clearCart() {
    this.cartItems = [];
  }
}
