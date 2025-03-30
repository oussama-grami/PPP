import { Injectable } from '@angular/core';
import {transaction} from "../Models/transaction";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
transactions:transaction[] = [];
  constructor() { }
  getTransactions():Observable<transaction[]>{
    this.transactions.push({
      country:'Saudi Arabia',
      flag:'/assets/img/saudiFlag.svg',
      cost:198.4,
      quantity:80 ,
      date:new Date()
    },
      {
        country:'Maroc',
        flag:'/assets/img/marrocoFlag.svg',
        cost:297.6,
        quantity:120 ,
        date:new Date()
      },
      {
        country:'Saudi Arabia',
        flag:'/assets/img/saudiFlag.svg',
        cost:198.4,
        quantity:80 ,
        date:new Date()
      },
      {
        country:'Saudi Arabia',
        flag:'/assets/img/saudiFlag.svg',
        cost:198.4,
        quantity:80 ,
        date:new Date()
      })
    return of(this.transactions)
  }
}
