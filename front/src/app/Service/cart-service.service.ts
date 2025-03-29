import {Injectable} from '@angular/core';
import {project} from "../Models/project";

type PartialProject = Partial<project> & Pick<project, 'name' | 'availableStock' | 'cost' | 'url'>;


@Injectable({
  providedIn: 'root'
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
    this.cartItems = [
      {name: 'Tree planting in Testour', availableStock: 200, cost: '2.48', url: '/assets/img/modalPhoto1.svg'},
      {name: 'Wind farm in Tunisia', availableStock: 500, cost: '2.25', url: '/assets/img/modalPhoto2.svg'},
      {name: 'Forestry project in Madagascar', availableStock: 500, cost: '7.5', url: '/assets/img/modalPhoto3.svg'}
    ];
  }

  getItems(): PartialProject[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.availableStock || 0) * (+item.cost || 0), 0);
  }

  addItem(item: PartialProject) {
    this.cartItems.push(item);
    this.saveCart();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].cost = ((+this.cartItems[index].cost || 0) + 1).toString();
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (+this.cartItems[index].cost > 1) {
      this.cartItems[index].cost = ((+this.cartItems[index].cost || 0) - 1).toString();
      this.saveCart();
    }
  }
}
