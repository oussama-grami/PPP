import { Component, OnInit } from '@angular/core';
import { Transaction } from "../../Models/transaction";
import { TransactionService } from "../../Service/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionsService: TransactionService) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
      }
    );
  }

  printInvoice(transaction: Transaction) {
    console.log("Printed invoice for transaction", transaction);
    // Implémentation de l'impression
  }

  // Calcul de l'impact environnemental positif basé sur le coût
  calculateTotalContribution(): number {
    // Pour chaque dollar investi, estimation de 3kg de CO2 économisé
    const totalContribution = this.transactions.reduce((sum, transaction) => sum + (transaction.cost * 3), 0);
    return Math.round(totalContribution * 10) / 10; // Arrondi à 1 décimale
  }

  // Obtenir le code pays pour les drapeaux (à implémenter selon vos besoins)
  getCountryCode(countryName: string): string {
    // Exemple simple - à adapter avec une vraie correspondance pays/code
    const countryCodes: {[key: string]: string} = {
      'France': 'fr',
      'USA': 'us',
      'Germany': 'de',
      'Canada': 'ca',
      'Japan': 'jp',
      'Brazil': 'br',
      'United Kingdom': 'gb',
      // Ajoutez d'autres pays selon vos besoins
    };

    return countryCodes[countryName] || 'unknown';
  }
}
