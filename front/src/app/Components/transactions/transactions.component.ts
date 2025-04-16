import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../Models/transaction";
import {TransactionService} from "../../Service/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  implements OnInit{
transactions:Transaction[] = []
  constructor(private transactionsSerice:TransactionService) {
  }
  ngOnInit() {
  this.transactionsSerice.getTransactions().subscribe(
    (data) => {
      this.transactions = data;
    }
  )
}

  printInvoice(transaction: Transaction) {
    console.log("printed")
  }
}
