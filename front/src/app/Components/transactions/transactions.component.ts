import {Component, OnInit} from '@angular/core';
import {transaction} from "../../Models/transaction";
import {TransactionService} from "../../Service/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  implements OnInit{
transactions:transaction[] = []
  constructor(private transactionsSerice:TransactionService) {
  }
  ngOnInit() {
  this.transactionsSerice.getTransactions().subscribe(
    (data) => {
      this.transactions = data;
    }
  )
}

  printInvoice(transaction: transaction) {
    console.log("printed")
  }
}
