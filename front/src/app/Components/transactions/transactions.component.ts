import { Component, OnInit } from '@angular/core';
import { Transaction } from "../../Models/transaction";
import { TransactionService } from "../../Service/transaction.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;


  constructor(private transactionsService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions(this.currentPage);
  }

  loadTransactions(page: number) {
    this.loading = true;
    this.transactionsService.getPaginatedTransactions(page, this.limit)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.transactions = data.content;
          console.log(data);
          this.totalPages = data.totalPages;
          console.log(this.totalPages);
          this.currentPage = data.number + 1;      // car data.number commence à 0
        },
        error: (error) => {
          console.error('Erreur pagination:', error);
        }
      });
  }


  printInvoice(transaction: Transaction) {
    console.log("Printed invoice for transaction", transaction);
    // Implémentation de l'impression
  }

  // Calcul de l'impact environnemental positif basé sur le coût
  calculateTotalContribution(): number {
    if (!this.transactions || this.transactions.length === 0) {
      return 0; // Protection contre les erreurs
    }

    // Pour chaque dollar investi, estimation de 3kg de CO2 économisé
    const totalContribution = this.transactions.reduce((sum, transaction) => sum + (transaction.totalPrice * 3), 0);
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
    };

    return countryCodes[countryName] || 'unknown';
  }

  onPageChanged(newPage: number) {
    this.loadTransactions(newPage);
  }

}
