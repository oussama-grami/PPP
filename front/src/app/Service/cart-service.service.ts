import {Injectable} from '@angular/core';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    /*const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }*/
    this.cartItems = [
      {name: 'Tree planting in Testour', quantity: 200, price: 2.48, imageUrl: '/assets/img/modalPhoto1.svg'},
      {name: 'Wind farm in Tunisia', quantity: 500, price: 2.25, imageUrl: '/assets/img/modalPhoto2.svg'},
      {name: 'Forestry project in Madagascar', quantity: 500, price: 7.5, imageUrl: '/assets/img/modalPhoto3.svg'}
    ];
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  addItem(item: CartItem) {
    this.cartItems.push(item);
    this.saveCart();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCart();
    }
  }
}
