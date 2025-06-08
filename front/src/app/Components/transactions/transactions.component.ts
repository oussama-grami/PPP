import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../Models/transaction';
import { TransactionService } from '../../Service/transaction.service';
import { ReceiptService } from '../../services/receipt.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(
    private transactionsService: TransactionService,
    private receiptService: ReceiptService
  ) {}

  ngOnInit() {
    this.loadTransactions(this.currentPage);
  }

  loadTransactions(page: number) {
    this.loading = true;
    this.transactionsService
      .getPaginatedTransactions(page, this.limit)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.transactions = data.content;
          console.log(data);
          this.totalPages = data.totalPages;
          console.log(this.totalPages);
          this.currentPage = data.number + 1; // car data.number commence à 0
        },
        error: (error) => {
          console.error('Error pagination:', error);
        },
      });
  }

  printInvoice(transaction: any): void {
    // Calculate environmental impact
    const co2Saved = Math.round(transaction.totalPrice * 10); // kg CO2 per dollar
    const treesEquivalent = Math.round(transaction.totalPrice / 25); // trees planted equivalent
    const waterSaved = Math.round(transaction.totalPrice * 50); // liters saved
    const energySaved = Math.round(transaction.totalPrice * 0.8); // kWh saved

    // Prepare receipt data for the receipt service
    const receiptData = {
      orderNumber: `ECO-${transaction.id}`,
      totalCost: `$${transaction.totalPrice.toFixed(2)}`,
      amount: transaction.totalPrice,
      carbonOffset: co2Saved,
      treeCount: treesEquivalent,
      date: transaction.createdAt,
      transactionData: {
        country: transaction.country,
        description: transaction.description || 'Green Investment Project',
        environmentalImpact:
          transaction.totalPrice >= 100
            ? 'High Impact'
            : transaction.totalPrice >= 50 && transaction.totalPrice < 100
            ? 'Medium Impact'
            : 'Standard Impact',
      },
      ecoBenefits: [
        {
          icon: 'co2',
          label: 'CO₂ Offset',
          value: `${co2Saved} kg`,
        },
        {
          icon: 'forest',
          label: 'Trees Planted Equivalent',
          value: `${treesEquivalent}`,
        },
        {
          icon: 'water',
          label: 'Water Saved',
          value: `${waterSaved} L`,
        },
        {
          icon: 'energy',
          label: 'Renewable Energy',
          value: `${energySaved} kWh`,
        },
      ],
    };

    // Use the receipt service to generate and print the invoice
    this.receiptService.generateReceiptPDF(receiptData);
  }

  // Calcul de l'impact environnemental positif basé sur le coût
  calculateTotalContribution(): number {
    if (!this.transactions || this.transactions.length === 0) {
      return 0; // Protection contre les erreurs
    }

    // Pour chaque dollar investi, estimation de 3kg de CO2 économisé
    const totalContribution = this.transactions.reduce(
      (sum, transaction) => sum + transaction.totalPrice * 3,
      0
    );
    return Math.round(totalContribution * 10) / 10; // Arrondi à 1 décimale
  }

  // Obtenir le code pays pour les drapeaux (à implémenter selon vos besoins)
  getCountryCode(countryName: string): string {
    // Exemple simple - à adapter avec une vraie correspondance pays/code
    const countryCodes: { [key: string]: string } = {
      France: 'fr',
      USA: 'us',
      Germany: 'de',
      Canada: 'ca',
      Japan: 'jp',
      Brazil: 'br',
      'United Kingdom': 'gb',
    };

    return countryCodes[countryName] || 'unknown';
  }

  onPageChanged(newPage: number) {
    this.loadTransactions(newPage);
  }
}
